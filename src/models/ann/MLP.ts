import { type ActivationFn, activationMap } from '../core/activations'
import { dot } from '../core/matrix'
import { mse, mseDeriv } from '../core/losses'

export interface LayerCache {
  z: number[]
  a: number[]
  delta: number[]
  dW: number[][]
  db: number[]
}

export interface ForwardResult {
  output: number[]
  caches: LayerCache[]
}

export interface BackwardResult {
  loss: number
  caches: LayerCache[]
}

export class MLP {
  layers: number[]
  actFns: ActivationFn[]
  W: number[][][]
  b: number[][]
  cache: LayerCache[]

  constructor(layers: number[], activations: string[]) {
    this.layers = layers
    this.actFns = activations.map((name) => activationMap[name])
    this.W = []
    this.b = []
    this.cache = []

    for (let l = 0; l < layers.length - 1; l++) {
      const fanIn = layers[l]
      const fanOut = layers[l + 1]
      const scale = Math.sqrt(2 / (fanIn + fanOut))

      const weights: number[][] = []
      const biases: number[] = []
      for (let j = 0; j < fanOut; j++) {
        const row: number[] = []
        for (let i = 0; i < fanIn; i++) {
          row.push((Math.random() * 2 - 1) * scale)
        }
        weights.push(row)
        biases.push(0)
      }
      this.W.push(weights)
      this.b.push(biases)
    }
  }

  forward(x: number[]): ForwardResult {
    const caches: LayerCache[] = []
    let current = x

    for (let l = 0; l < this.W.length; l++) {
      const z: number[] = []
      for (let j = 0; j < this.W[l].length; j++) {
        z.push(dot(this.W[l][j], current) + this.b[l][j])
      }
      const a = z.map((val) => this.actFns[l].fn(val))

      caches.push({ z, a, delta: [], dW: [], db: [] })
      current = a
    }

    this.cache = caches
    return { output: current, caches }
  }

  computeGradients(input: number[], target: number[]): BackwardResult {
    const { output, caches } = this.forward(input)
    const loss = mse(output, target)
    const numLayers = this.W.length

    // Output layer delta
    const outputDeriv = mseDeriv(output, target)
    const outputCache = caches[numLayers - 1]
    outputCache.delta = outputDeriv.map((d, i) =>
      d * this.actFns[numLayers - 1].derivative(outputCache.z[i], outputCache.a[i])
    )

    // Hidden layer deltas
    for (let l = numLayers - 2; l >= 0; l--) {
      const nextDelta = caches[l + 1].delta
      const delta: number[] = []
      for (let i = 0; i < this.W[l].length; i++) {
        let sum = 0
        for (let j = 0; j < this.W[l + 1].length; j++) {
          sum += this.W[l + 1][j][i] * nextDelta[j]
        }
        delta.push(sum * this.actFns[l].derivative(caches[l].z[i], caches[l].a[i]))
      }
      caches[l].delta = delta
    }

    // Compute weight gradients
    for (let l = 0; l < numLayers; l++) {
      const prevA = l === 0 ? input : caches[l - 1].a
      const delta = caches[l].delta
      caches[l].dW = delta.map((d) => prevA.map((a) => d * a))
      caches[l].db = [...delta]
    }

    this.cache = caches
    return { loss, caches }
  }

  applyGradients(lr: number): void {
    for (let l = 0; l < this.W.length; l++) {
      const cache = this.cache[l]
      for (let j = 0; j < this.W[l].length; j++) {
        for (let i = 0; i < this.W[l][j].length; i++) {
          this.W[l][j][i] -= lr * cache.dW[j][i]
        }
        this.b[l][j] -= lr * cache.db[j]
      }
    }
  }

  cloneWeights(): { W: number[][][]; b: number[][] } {
    return {
      W: this.W.map((layer) => layer.map((row) => [...row])),
      b: this.b.map((layer) => [...layer]),
    }
  }

  loadWeights(snapshot: { W: number[][][]; b: number[][] }): void {
    this.W = snapshot.W.map((layer) => layer.map((row) => [...row]))
    this.b = snapshot.b.map((layer) => [...layer])
  }
}
