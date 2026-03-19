import { useEffect, useRef, useMemo } from 'react'
import { MLP } from '../../models/ann/MLP'
import type { Dataset } from '../../data/datasets'
import { useTranslation } from '../../i18n/useTranslation'
import { HelpTooltip } from '../shared/HelpTooltip'

interface DecisionBoundaryProps {
  layers: number[]
  activations: string[]
  weights: { W: number[][][]; b: number[][] }
  dataset: Dataset
}

const CANVAS_SIZE = 250
const GRID_RES = 70

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

    // Draw data points
    const [xMin, xMax] = dataset.rangeX
    const [yMin, yMax] = dataset.rangeY

    for (let i = 0; i < dataset.inputs.length; i++) {
      const [px, py] = dataset.inputs[i]
      const target = dataset.targets[i][0]

      const cx = ((px - xMin) / (xMax - xMin)) * CANVAS_SIZE
      const cy = ((py - yMin) / (yMax - yMin)) * CANVAS_SIZE

      ctx.beginPath()
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = target > 0.5 ? '#56d364' : '#f85149'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.7)'
      ctx.lineWidth = 0.8
      ctx.stroke()
    }
  }, [heatmapData, dataset])

  return (
    <div
      className="rounded-xl flex flex-col"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '8px 12px',
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <h4 className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t.simulator.panels.decisionBoundary}
        </h4>
        <HelpTooltip title={t.help.decisionBoundary.title} content={t.help.decisionBoundary.content} />
      </div>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg"
        style={{ aspectRatio: '1/1' }}
      />
    </div>
  )
}
