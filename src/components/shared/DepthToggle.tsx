import { useSimStore, type DepthMode } from '../../store/useSimStore'
import { useTranslation } from '../../i18n/useTranslation'

export function DepthToggle() {
  const { t } = useTranslation()
  const depthMode = useSimStore((s) => s.depthMode)
  const setDepthMode = useSimStore((s) => s.setDepthMode)

  const options: { value: DepthMode; label: string }[] = [
    { value: 'intuitive', label: t.simulator.depth.intuitive },
    { value: 'technical', label: t.simulator.depth.technical },
  ]

  return (
    <div
      className="flex rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border)' }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setDepthMode(opt.value)}
          className="px-3 py-1.5 text-xs font-medium cursor-pointer border-none transition-colors"
          style={{
            backgroundColor: depthMode === opt.value ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
            color: depthMode === opt.value ? '#fff' : 'var(--text-muted)',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
