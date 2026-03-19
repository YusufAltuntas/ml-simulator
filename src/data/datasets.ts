export interface Dataset {
  name: { tr: string; en: string }
  inputs: number[][]
  targets: number[][]
  featureNames: string[]
  rangeX: [number, number]
  rangeY: [number, number]
}

export const XOR_DATASET: Dataset = {
  name: { tr: 'XOR Problemi', en: 'XOR Problem' },
  inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
  targets: [[0], [1], [1], [0]],
  featureNames: ['x1', 'x2'],
  rangeX: [-0.5, 1.5],
  rangeY: [-0.5, 1.5],
}

export const AND_DATASET: Dataset = {
  name: { tr: 'AND Kapisi', en: 'AND Gate' },
  inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
  targets: [[0], [0], [0], [1]],
  featureNames: ['x1', 'x2'],
  rangeX: [-0.5, 1.5],
  rangeY: [-0.5, 1.5],
}

export const OR_DATASET: Dataset = {
  name: { tr: 'OR Kapisi', en: 'OR Gate' },
  inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
  targets: [[0], [1], [1], [1]],
  featureNames: ['x1', 'x2'],
  rangeX: [-0.5, 1.5],
  rangeY: [-0.5, 1.5],
}

function generateCircleDataset(n: number = 200): Dataset {
  const inputs: number[][] = []
  const targets: number[][] = []

  for (let i = 0; i < n; i++) {
    const angle = (Math.random() * 2 * Math.PI)
    const isInner = i < n / 2

    const r = isInner
      ? Math.random() * 0.4
      : 0.7 + Math.random() * 0.3

    const x = Math.cos(angle) * r + 0.5
    const y = Math.sin(angle) * r + 0.5

    inputs.push([x, y])
    targets.push([isInner ? 0 : 1])
  }

  return {
    name: { tr: 'Daire Siniflandirma', en: 'Circle Classification' },
    inputs,
    targets,
    featureNames: ['x', 'y'],
    rangeX: [-0.2, 1.2],
    rangeY: [-0.2, 1.2],
  }
}

export const CIRCLE_DATASET: Dataset = generateCircleDataset()

export const datasetMap: Record<string, Dataset> = {
  xor: XOR_DATASET,
  and: AND_DATASET,
  or: OR_DATASET,
  circle: CIRCLE_DATASET,
}

export function regenerateCircleDataset(): void {
  const newData = generateCircleDataset()
  datasetMap.circle = newData
}
