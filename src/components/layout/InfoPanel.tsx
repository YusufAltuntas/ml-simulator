import { useSimStore } from '../../store/useSimStore'
import { useTranslation } from '../../i18n/useTranslation'
import type { SimStep } from '../../simulators/ANNSimulator'
import { FormulaBox } from '../shared/FormulaBox'
import { ValueCard } from '../shared/ValueCard'

interface InfoPanelProps {
  step: SimStep | null
}

const tagColors: Record<string, string> = {
  input: 'var(--accent-blue)',
  forward: 'var(--accent-cyan)',
  loss: 'var(--accent-orange)',
  backward: 'var(--accent-red)',
  update: 'var(--accent-green)',
}

export function InfoPanel({ step }: InfoPanelProps) {
  const { t, language } = useTranslation()
  const depthMode = useSimStore((s) => s.depthMode)

  if (!step) {
    return (
      <div
        className="p-4 rounded-xl h-full"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      >
        <p style={{ color: 'var(--text-muted)' }} className="text-sm">
          {t.simulator.panels.info}
        </p>
      </div>
    )
  }

  const title = step.title[language]
  const description = step.description[language]
  const technicalNote = step.technicalNote[language]
  const tagColor = tagColors[step.tag] || 'var(--text-muted)'

  return (
    <div
      className="p-4 rounded-xl flex flex-col gap-3 overflow-y-auto"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        maxHeight: 'calc(100vh - 120px)',
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full uppercase"
          style={{ backgroundColor: tagColor, color: '#fff' }}
        >
          {step.tag}
        </span>
        {step.layer !== undefined && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Layer {step.layer + 1}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>

      {depthMode === 'technical' && technicalNote && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <span className="font-mono text-xs">{technicalNote}</span>
        </div>
      )}

      {step.formula && <FormulaBox formula={step.formula} />}

      <div className="flex flex-col gap-2 mt-1">
        {Object.entries(step.values).map(([key, val]) => {
          if (typeof val === 'number') {
            return <ValueCard key={key} label={key} values={[val]} />
          }
          if (Array.isArray(val) && typeof val[0] === 'number') {
            return <ValueCard key={key} label={key} values={val as number[]} />
          }
          return null
        })}
      </div>

      <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
        Epoch {step.epoch + 1} | Sample {step.sampleIndex + 1}
      </div>
    </div>
  )
}
