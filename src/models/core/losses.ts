const EPS = 1e-15

export function mse(pred: number[], target: number[]): number {
  const n = pred.length
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += (pred[i] - target[i]) ** 2
  }
  return sum / n
}

export function mseDeriv(pred: number[], target: number[]): number[] {
  const n = pred.length
  return pred.map((p, i) => (2 * (p - target[i])) / n)
}

export function crossEntropy(pred: number[], target: number[]): number {
  return -target.reduce((sum, t, i) => sum + t * Math.log(pred[i] + EPS), 0)
}

export function crossEntropyDeriv(pred: number[], target: number[]): number[] {
  return pred.map((p, i) => -target[i] / (p + EPS))
}

export function binaryCrossEntropy(pred: number, target: number): number {
  return -(target * Math.log(pred + EPS) + (1 - target) * Math.log(1 - pred + EPS))
}

export function binaryCrossEntropyDeriv(pred: number, target: number): number {
  return -(target / (pred + EPS)) + (1 - target) / (1 - pred + EPS)
}
