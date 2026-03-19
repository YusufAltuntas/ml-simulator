export type ThemeMode = 'dark' | 'light'

export const darkTokens: Record<string, string> = {
  '--bg-primary': '#07090f',
  '--bg-secondary': '#0d1117',
  '--bg-tertiary': '#161b22',
  '--border': '#30363d',
  '--text-primary': '#e6edf3',
  '--text-muted': '#8b949e',
  '--accent-blue': '#58a6ff',
  '--accent-cyan': '#39d0d8',
  '--accent-green': '#56d364',
  '--accent-orange': '#e3b341',
  '--accent-red': '#f85149',
  '--accent-purple': '#bc8cff',
}

export const lightTokens: Record<string, string> = {
  '--bg-primary': '#ffffff',
  '--bg-secondary': '#f6f8fa',
  '--bg-tertiary': '#eaeef2',
  '--border': '#d0d7de',
  '--text-primary': '#1f2328',
  '--text-muted': '#656d76',
  '--accent-blue': '#0969da',
  '--accent-cyan': '#0891b2',
  '--accent-green': '#1a7f37',
  '--accent-orange': '#bf8700',
  '--accent-red': '#cf222e',
  '--accent-purple': '#8250df',
}

export function applyTheme(mode: ThemeMode): void {
  const tokens = mode === 'dark' ? darkTokens : lightTokens
  const root = document.documentElement
  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(key, value)
  }
  root.classList.toggle('dark', mode === 'dark')
}
