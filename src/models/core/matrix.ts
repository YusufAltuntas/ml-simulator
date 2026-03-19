export function matMul(A: number[][], B: number[][]): number[][] {
  const rowsA = A.length
  const colsA = A[0].length
  const colsB = B[0].length
  const result: number[][] = []
  for (let i = 0; i < rowsA; i++) {
    const row: number[] = []
    for (let j = 0; j < colsB; j++) {
      let sum = 0
      for (let k = 0; k < colsA; k++) {
        sum += A[i][k] * B[k][j]
      }
      row.push(sum)
    }
    result.push(row)
  }
  return result
}

export function matAdd(A: number[][], B: number[][]): number[][] {
  return A.map((row, i) => row.map((val, j) => val + B[i][j]))
}

export function matSub(A: number[][], B: number[][]): number[][] {
  return A.map((row, i) => row.map((val, j) => val - B[i][j]))
}

export function transpose(A: number[][]): number[][] {
  const rows = A.length
  const cols = A[0].length
  const result: number[][] = []
  for (let j = 0; j < cols; j++) {
    const row: number[] = []
    for (let i = 0; i < rows; i++) {
      row.push(A[i][j])
    }
    result.push(row)
  }
  return result
}

export function dot(a: number[], b: number[]): number {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i]
  }
  return sum
}

export function outerProduct(a: number[], b: number[]): number[][] {
  return a.map(ai => b.map(bj => ai * bj))
}

export function scalarMul(A: number[][], s: number): number[][] {
  return A.map(row => row.map(val => val * s))
}
