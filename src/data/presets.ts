export interface ANNPreset {
  id: string
  name: { tr: string; en: string }
  layers: number[]
  activations: string[]
  learningRate: number
  epochs: number
  datasetKey: string
}

export const ANN_PRESETS: ANNPreset[] = [
  {
    id: 'xor-simple',
    name: { tr: 'XOR - Basit', en: 'XOR - Simple' },
    layers: [2, 4, 1],
    activations: ['sigmoid', 'sigmoid'],
    learningRate: 0.5,
    epochs: 50,
    datasetKey: 'xor',
  },
  {
    id: 'xor-deep',
    name: { tr: 'XOR - Derin', en: 'XOR - Deep' },
    layers: [2, 4, 4, 1],
    activations: ['relu', 'relu', 'sigmoid'],
    learningRate: 0.1,
    epochs: 100,
    datasetKey: 'xor',
  },
  {
    id: 'circle',
    name: { tr: 'Daire Siniflandirma', en: 'Circle Classification' },
    layers: [2, 8, 8, 1],
    activations: ['relu', 'relu', 'sigmoid'],
    learningRate: 0.05,
    epochs: 100,
    datasetKey: 'circle',
  },
]
