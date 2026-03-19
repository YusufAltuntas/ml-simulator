interface ValueCardProps {
  label: string
  values: number[]
}

export function ValueCard({ label, values }: ValueCardProps) {
  return (
    <div
      className="p-2 rounded-lg"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-1">
        {values.map((v, i) => {
          const color =
            v > 0
              ? 'var(--accent-green)'
              : v < 0
                ? 'var(--accent-red)'
                : 'var(--text-muted)'
          return (
            <span
              key={i}
              className="font-mono text-xs px-1.5 py-0.5 rounded"
              style={{ color, backgroundColor: 'var(--bg-primary)' }}
            >
              {v.toFixed(4)}
            </span>
          )
        })}
      </div>
    </div>
  )
}
