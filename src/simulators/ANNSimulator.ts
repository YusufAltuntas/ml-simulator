import { MLP } from '../models/ann/MLP'
import type { Dataset } from '../data/datasets'

export interface SimStep {
  id: string
  type: 'input' | 'forward_z' | 'forward_a' | 'loss' | 'backward' | 'update'
  tag: 'input' | 'forward' | 'backward' | 'update' | 'loss'
  layer?: number
  epoch: number
  sampleIndex: number
  title: { tr: string; en: string }
  description: { tr: string; en: string }
  technicalNote: { tr: string; en: string }
  formula: string
  values: Record<string, number | number[] | number[][]>
  highlightNodes: { layer: number; indices: number[] }[]
  highlightEdges: { fromLayer: number; toLayer: number }[]
  animationType: 'pulse' | 'flow' | 'flash'
  weights?: { W: number[][][]; b: number[][] }
}

export interface SimConfig {
  layers: number[]
  activations: string[]
  learningRate: number
  epochs: number
  dataset: Dataset
}

function fmt(arr: number[]): string {
  return '[' + arr.map((v) => v.toFixed(4)).join(', ') + ']'
}

export class ANNSimulator {
  config: SimConfig
  mlp: MLP
  steps: SimStep[] = []
  lossHistory: { epoch: number; loss: number }[] = []
  weightSnapshots: { W: number[][][]; b: number[][] }[] = []

  constructor(config: SimConfig) {
    this.config = config
    this.mlp = new MLP(config.layers, config.activations)
  }

  generateAllSteps(): SimStep[] {
    this.steps = []
    this.lossHistory = []
    this.weightSnapshots = [this.mlp.cloneWeights()]

    const { dataset, learningRate, epochs } = this.config
    const numLayers = this.mlp.W.length
    const isLargeDataset = dataset.inputs.length > 10
    const samplesPerEpoch = isLargeDataset ? 10 : dataset.inputs.length

    for (let epoch = 0; epoch < epochs; epoch++) {
      let epochLoss = 0

      const sampleIndices = isLargeDataset
        ? Array.from({ length: samplesPerEpoch }, (_, i) =>
            Math.floor((i / samplesPerEpoch) * dataset.inputs.length)
          )
        : dataset.inputs.map((_, i) => i)

      for (let si = 0; si < sampleIndices.length; si++) {
        const sIdx = sampleIndices[si]
        const input = dataset.inputs[sIdx]
        const target = dataset.targets[sIdx]

        // 1. Input step
        this.steps.push({
          id: `e${epoch}-s${si}-input`,
          type: 'input',
          tag: 'input',
          epoch,
          sampleIndex: si,
          title: { tr: 'Girdi', en: 'Input' },
          description: {
            tr: `Girdi verisi aga besleniyor: ${fmt(input)} → Hedef: ${fmt(target)}`,
            en: `Feeding input data to the network: ${fmt(input)} → Target: ${fmt(target)}`,
          },
          technicalNote: {
            tr: `x = ${fmt(input)}, y = ${fmt(target)}. Girdi katmani noronlarina yuklenir.`,
            en: `x = ${fmt(input)}, y = ${fmt(target)}. Loaded into input layer neurons.`,
          },
          formula: `x = ${fmt(input)}`,
          values: { input, target },
          highlightNodes: [{ layer: 0, indices: input.map((_, i) => i) }],
          highlightEdges: [],
          animationType: 'pulse',
        })

        // 2. Forward pass — z and a for each layer
        const { caches } = this.mlp.forward(input)

        for (let l = 0; l < numLayers; l++) {
          const z = caches[l].z
          const a = caches[l].a
          const actName = this.config.activations[l]

          this.steps.push({
            id: `e${epoch}-s${si}-fz-${l}`,
            type: 'forward_z',
            tag: 'forward',
            layer: l,
            epoch,
            sampleIndex: si,
            title: {
              tr: `Katman ${l + 1} — Agirlikli Toplam`,
              en: `Layer ${l + 1} — Weighted Sum`,
            },
            description: {
              tr: `Her noron girdilerini agirliklariyla carpip toplar ve bias ekler.`,
              en: `Each neuron multiplies inputs by weights, sums them, and adds bias.`,
            },
            technicalNote: {
              tr: `z${l + 1} = W${l + 1} · a${l} + b${l + 1} = ${fmt(z)}`,
              en: `z${l + 1} = W${l + 1} · a${l} + b${l + 1} = ${fmt(z)}`,
            },
            formula: `z = W · a + b`,
            values: { z, weights: this.mlp.W[l], bias: this.mlp.b[l] },
            highlightNodes: [
              { layer: l, indices: (l === 0 ? input : caches[l - 1].a).map((_, i) => i) },
              { layer: l + 1, indices: z.map((_, i) => i) },
            ],
            highlightEdges: [{ fromLayer: l, toLayer: l + 1 }],
            animationType: 'flow',
          })

          this.steps.push({
            id: `e${epoch}-s${si}-fa-${l}`,
            type: 'forward_a',
            tag: 'forward',
            layer: l,
            epoch,
            sampleIndex: si,
            title: {
              tr: `Katman ${l + 1} — ${actName} Aktivasyonu`,
              en: `Layer ${l + 1} — ${actName} Activation`,
            },
            description: {
              tr: `Aktivasyon fonksiyonu agirlikli toplami donusturur.`,
              en: `The activation function transforms the weighted sum.`,
            },
            technicalNote: {
              tr: `a${l + 1} = ${actName}(z${l + 1}) = ${fmt(a)}`,
              en: `a${l + 1} = ${actName}(z${l + 1}) = ${fmt(a)}`,
            },
            formula: `a = ${actName}(z)`,
            values: { z, a },
            highlightNodes: [{ layer: l + 1, indices: a.map((_, i) => i) }],
            highlightEdges: [],
            animationType: 'pulse',
          })
        }

        // 3. Loss step
        const { loss, caches: gradCaches } = this.mlp.computeGradients(input, target)
        epochLoss += loss
        const output = gradCaches[numLayers - 1].a

        this.steps.push({
          id: `e${epoch}-s${si}-loss`,
          type: 'loss',
          tag: 'loss',
          epoch,
          sampleIndex: si,
          title: { tr: 'Kayip Hesapla', en: 'Calculate Loss' },
          description: {
            tr: `Tahmin: ${fmt(output)}, Hedef: ${fmt(target)}. Kayip = ${loss.toFixed(6)}`,
            en: `Prediction: ${fmt(output)}, Target: ${fmt(target)}. Loss = ${loss.toFixed(6)}`,
          },
          technicalNote: {
            tr: `MSE = (1/n) Σ(y - ŷ)² = ${loss.toFixed(6)}`,
            en: `MSE = (1/n) Σ(y - ŷ)² = ${loss.toFixed(6)}`,
          },
          formula: `L = (1/n) Σ(yᵢ - ŷᵢ)²`,
          values: { prediction: output, target, loss },
          highlightNodes: [{ layer: numLayers, indices: output.map((_, i) => i) }],
          highlightEdges: [],
          animationType: 'flash',
        })

        // 4. Backward steps
        for (let l = numLayers - 1; l >= 0; l--) {
          const delta = gradCaches[l].delta
          const dW = gradCaches[l].dW

          this.steps.push({
            id: `e${epoch}-s${si}-bw-${l}`,
            type: 'backward',
            tag: 'backward',
            layer: l,
            epoch,
            sampleIndex: si,
            title: {
              tr: `Katman ${l + 1} — Geri Yayilim`,
              en: `Layer ${l + 1} — Backpropagation`,
            },
            description: {
              tr: `Hata sinyali bu katmana yayiliyor. Her noronun hataya katkisi hesaplaniyor.`,
              en: `Error signal propagates to this layer. Each neuron's contribution to the error is computed.`,
            },
            technicalNote: {
              tr: `δ${l + 1} = ${fmt(delta)}. Agirlik gradyanlari hesaplandi.`,
              en: `δ${l + 1} = ${fmt(delta)}. Weight gradients computed.`,
            },
            formula: l === numLayers - 1
              ? `δ = (ŷ - y) · f'(z)`
              : `δₗ = (Wₗ₊₁ᵀ · δₗ₊₁) ⊙ f'(zₗ)`,
            values: { delta, dW },
            highlightNodes: [{ layer: l + 1, indices: delta.map((_, i) => i) }],
            highlightEdges: [{ fromLayer: l, toLayer: l + 1 }],
            animationType: 'flow',
          })
        }

        // 5. Update step
        this.mlp.applyGradients(learningRate)

        this.steps.push({
          id: `e${epoch}-s${si}-update`,
          type: 'update',
          tag: 'update',
          epoch,
          sampleIndex: si,
          title: { tr: 'Agirliklari Guncelle', en: 'Update Weights' },
          description: {
            tr: `Tum agirliklar ogrenme orani (${learningRate}) ile guncellendi.`,
            en: `All weights updated with learning rate ${learningRate}.`,
          },
          technicalNote: {
            tr: `W ← W - ${learningRate} · ∂L/∂W, b ← b - ${learningRate} · ∂L/∂b`,
            en: `W ← W - ${learningRate} · ∂L/∂W, b ← b - ${learningRate} · ∂L/∂b`,
          },
          formula: `W ← W - η · ∂L/∂W`,
          values: { learningRate },
          highlightNodes: [],
          highlightEdges: Array.from({ length: numLayers }, (_, l) => ({
            fromLayer: l,
            toLayer: l + 1,
          })),
          animationType: 'flash',
          weights: this.mlp.cloneWeights(),
        })
      }

      const avgLoss = epochLoss / sampleIndices.length
      this.lossHistory.push({ epoch, loss: avgLoss })
      this.weightSnapshots.push(this.mlp.cloneWeights())
    }

    return this.steps
  }

  getWeightsAtEpoch(epoch: number): { W: number[][][]; b: number[][] } {
    const idx = Math.min(epoch, this.weightSnapshots.length - 1)
    return this.weightSnapshots[idx]
  }

  getLossUpToStep(stepIndex: number): { epoch: number; loss: number }[] {
    if (stepIndex < 0 || this.steps.length === 0) return []
    const currentEpoch = this.steps[Math.min(stepIndex, this.steps.length - 1)].epoch
    return this.lossHistory.filter((entry) => entry.epoch <= currentEpoch)
  }
}
