interface FormulaBoxProps {
  formula: string
}

export function FormulaBox({ formula }: FormulaBoxProps) {
  return (
    <div
      className="px-3 py-2 rounded-lg text-center"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border)',
      }}
    >
      <span
        className="font-mono text-sm font-medium"
        style={{ color: 'var(--accent-cyan)' }}
      >
        {formula}
      </span>
    </div>
  )
}
