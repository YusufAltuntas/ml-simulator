import { useMemo } from 'react'
import type { SimStep } from '../../simulators/ANNSimulator'

interface NetworkSVGProps {
  layers: number[]
  weights: { W: number[][][]; b: number[][] }
  step: SimStep | null
  activations?: number[][]
}

const WIDTH = 600
const HEIGHT = 320
const PADDING_X = 60
const PADDING_Y = 30
const NODE_RADIUS = 14

function valueToColor(value: number): string {
  const clamped = Math.max(-1, Math.min(1, value))
  if (clamped >= 0) {
    const g = Math.round(86 + clamped * 169)
    return `rgb(86, ${g}, 100)`
  } else {
    const r = Math.round(248 + clamped * 100)
    return `rgb(${r}, 81, 73)`
  }
}

function weightToOpacity(weight: number): number {
  return Math.min(1, Math.abs(weight) * 0.8 + 0.1)
}

function weightToWidth(weight: number): number {
  return Math.min(3, Math.abs(weight) * 1.5 + 0.3)
}

export function NetworkSVG({ layers, weights, step, activations }: NetworkSVGProps) {
  const positions = useMemo(() => {
    const numLayers = layers.length
    const layerX = layers.map((_, i) =>
      PADDING_X + (i / (numLayers - 1)) * (WIDTH - 2 * PADDING_X)
    )

    const nodePositions: { x: number; y: number }[][] = []

    for (let l = 0; l < numLayers; l++) {
      const n = layers[l]
      const totalHeight = HEIGHT - 2 * PADDING_Y
      const spacing = n > 1 ? totalHeight / (n - 1) : 0
      const startY = n > 1 ? PADDING_Y : HEIGHT / 2

      const layerNodes: { x: number; y: number }[] = []
      for (let i = 0; i < n; i++) {
        layerNodes.push({ x: layerX[l], y: startY + i * spacing })
      }
      nodePositions.push(layerNodes)
    }

    return nodePositions
  }, [layers])

  const highlightedNodeSet = useMemo(() => {
    const set = new Set<string>()
    if (step?.highlightNodes) {
      for (const hn of step.highlightNodes) {
        for (const idx of hn.indices) {
          set.add(`${hn.layer}-${idx}`)
        }
      }
    }
    return set
  }, [step])

  const highlightedEdgeSet = useMemo(() => {
    const set = new Set<string>()
    if (step?.highlightEdges) {
      for (const he of step.highlightEdges) {
        set.add(`${he.fromLayer}-${he.toLayer}`)
      }
    }
    return set
  }, [step])

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" style={{ display: 'block' }}>
        {/* Edges */}
        {weights.W.map((layerW, l) =>
          layerW.map((neuronWeights, j) =>
            neuronWeights.map((w, i) => {
              const from = positions[l][i]
              const to = positions[l + 1][j]
              const isHighlighted = highlightedEdgeSet.has(`${l}-${l + 1}`)
              const edgeColor = w >= 0 ? 'var(--accent-cyan)' : 'var(--accent-red)'
              return (
                <line
                  key={`e-${l}-${i}-${j}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isHighlighted ? edgeColor : 'var(--border)'}
                  strokeWidth={isHighlighted ? weightToWidth(w) : 0.5}
                  opacity={isHighlighted ? weightToOpacity(w) : 0.3}
                />
              )
            })
          )
        )}

        {/* Nodes */}
        {positions.map((layerNodes, l) =>
          layerNodes.map((pos, i) => {
            const isHighlighted = highlightedNodeSet.has(`${l}-${i}`)
            const aVal = activations?.[l]?.[i]
            const fillColor = aVal !== undefined ? valueToColor(aVal) : 'var(--bg-tertiary)'

            return (
              <g key={`n-${l}-${i}`}>
                {isHighlighted && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_RADIUS + 4}
                    fill="none"
                    stroke="var(--accent-blue)"
                    strokeWidth={2}
                    opacity={0.6}
                  >
                    <animate
                      attributeName="r"
                      values={`${NODE_RADIUS + 2};${NODE_RADIUS + 6};${NODE_RADIUS + 2}`}
                      dur="1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0.2;0.6"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_RADIUS}
                  fill={fillColor}
                  stroke={isHighlighted ? 'var(--accent-blue)' : 'var(--border)'}
                  strokeWidth={isHighlighted ? 2 : 1}
                />
                {aVal !== undefined && layers[l] <= 8 && (
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--text-primary)"
                    fontSize={8}
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {aVal.toFixed(2)}
                  </text>
                )}
              </g>
            )
          })
        )}

        {/* Layer labels */}
        {positions.map((layerNodes, l) => (
          <text
            key={`label-${l}`}
            x={layerNodes[0].x}
            y={HEIGHT - 5}
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize={10}
            fontFamily="'Inter', sans-serif"
          >
            {l === 0 ? 'Input' : l === layers.length - 1 ? 'Output' : `H${l}`}
          </text>
        ))}
      </svg>
    </div>
  )
}
