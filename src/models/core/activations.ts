export interface ActivationFn {
  name: string
  fn: (z: number) => number
  derivative: (z: number, a?: number) => number
}

export const relu: ActivationFn = {
  name: 'relu',
  fn: (z) => Math.max(0, z),
  derivative: (z) => (z > 0 ? 1 : 0),
}

export const sigmoid: ActivationFn = {
  name: 'sigmoid',
  fn: (z) => 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, z)))),
  derivative: (_z, a) => {
    const s = a ?? sigmoid.fn(_z)
    return s * (1 - s)
  },
}

export const tanhAct: ActivationFn = {
  name: 'tanh',
  fn: (z) => Math.tanh(z),
  derivative: (_z, a) => {
    const t = a ?? Math.tanh(_z)
    return 1 - t * t
  },
}

export const leakyRelu: ActivationFn = {
  name: 'leakyRelu',
  fn: (z) => (z > 0 ? z : 0.01 * z),
  derivative: (z) => (z > 0 ? 1 : 0.01),
}

export const gelu: ActivationFn = {
  name: 'gelu',
  fn: (z) => {
    const cdf = 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (z + 0.044715 * z ** 3)))
    return z * cdf
  },
  derivative: (z) => {
    const c = Math.sqrt(2 / Math.PI)
    const inner = c * (z + 0.044715 * z ** 3)
    const tanhVal = Math.tanh(inner)
    const sech2 = 1 - tanhVal * tanhVal
    const dInner = c * (1 + 3 * 0.044715 * z * z)
    return 0.5 * (1 + tanhVal) + 0.5 * z * sech2 * dInner
  },
}

export function softmax(z: number[]): number[] {
  const max = Math.max(...z)
  const exps = z.map((v) => Math.exp(v - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((v) => v / sum)
}

export const activationMap: Record<string, ActivationFn> = {
  relu,
  sigmoid,
  tanh: tanhAct,
  leakyRelu,
  gelu,
}
