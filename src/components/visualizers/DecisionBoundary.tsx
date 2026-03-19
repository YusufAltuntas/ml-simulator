import { useEffect, useRef, useMemo } from 'react'
import { MLP } from '../../models/ann/MLP'
import type { Dataset } from '../../data/datasets'
import { useTranslation } from '../../i18n/useTranslation'

interface DecisionBoundaryProps {
  layers: number[]
  activations: string[]
  weights: { W: number[][][]; b: number[][] }
  dataset: Dataset
}

const CANVAS_SIZE = 300
const GRID_RES = 80

export function DecisionBoundary({ layers, activations, weights, dataset }: DecisionBoundaryProps) {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const heatmapData = useMemo(() => {
    const mlp = new MLP(layers, activations)
    mlp.loadWeights(weights)

    const [xMin, xMax] = dataset.rangeX
    const [yMin, yMax] = dataset.rangeY
    const data: number[] = []

    for (let row = 0; row < GRID_RES; row++) {
      for (let col = 0; col < GRID_RES; col++) {
        const x = xMin + (col / (GRID_RES - 1)) * (xMax - xMin)
        const y = yMin + (row / (GRID_RES - 1)) * (yMax - yMin)
        const { output } = mlp.forward([x, y])
        data.push(output[0])
      }
    }

    return data
  }, [layers, activations, weights, dataset])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE

    const cellW = CANVAS_SIZE / GRID_RES
    const cellH = CANVAS_SIZE / GRID_RES

    // Draw heatmap
    for (let row = 0; row < GRID_RES; row++) {
      for (let col = 0; col < GRID_RES; col++) {
        const val = heatmapData[row * GRID_RES + col]
        const clamped = Math.max(0, Math.min(1, val))

        ctx.fillStyle = clamped > 0.5
          ? `rgba(86, ${Math.round(86 + (clamped - 0.5) * 2 * 169)}, 100, 0.7)`
          : `rgba(${Math.round(248 - (0.5 - clamped) * 2 * 100)}, 81, 73, 0.7)`

        ctx.fillRect(col * cellW, row * cellH, cellW + 0.5, cellH + 0.5)
      }
    }

    // Draw decision boundary (0.5 contour)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    for (let row = 0; row < GRID_RES - 1; row++) {
      for (let col = 0; col < GRID_RES - 1; col++) {
        const v00 = heatmapData[row * GRID_RES + col]
        const v10 = heatmapData[row * GRID_RES + col + 1]
        const v01 = heatmapData[(row + 1) * GRID_RES + col]

        if ((v00 - 0.5) * (v10 - 0.5) < 0 || (v00 - 0.5) * (v01 - 0.5) < 0) {
          const x = (col + 0.5) * cellW
          const y = (row + 0.5) * cellH
          ctx.moveTo(x - 1, y - 1)
          ctx.lineTo(x + 1, y + 1)
        }
      }
    }
    ctx.stroke()

    // Draw data points
    const [xMin, xMax] = dataset.rangeX
    const [yMin, yMax] = dataset.rangeY

    for (let i = 0; i < dataset.inputs.length; i++) {
      const [px, py] = dataset.inputs[i]
      const target = dataset.targets[i][0]

      const cx = ((px - xMin) / (xMax - xMin)) * CANVAS_SIZE
      const cy = ((py - yMin) / (yMax - yMin)) * CANVAS_SIZE

      ctx.beginPath()
      ctx.arc(cx, cy, 4, 0, Math.PI * 2)
      ctx.fillStyle = target > 0.5 ? '#56d364' : '#f85149'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }, [heatmapData, dataset])

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {t.simulator.panels.decisionBoundary}
      </h4>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ aspectRatio: '1/1', maxWidth: CANVAS_SIZE }}
      />
    </div>
  )
}
