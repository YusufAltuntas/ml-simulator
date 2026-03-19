import { useSimStore } from '../../store/useSimStore'
import { useTranslation } from '../../i18n/useTranslation'
import type { SimStep } from '../../simulators/ANNSimulator'
import { FormulaBox } from '../shared/FormulaBox'
import { HelpTooltip } from '../shared/HelpTooltip'

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
        className="rounded-xl h-full flex items-center justify-center"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          padding: '14px 16px',
        }}
      >
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
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
      className="rounded-xl flex flex-col gap-2 overflow-y-auto h-full"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '14px 16px',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <HelpTooltip title={t.help.stepInfo.title} content={t.help.stepInfo.content} />
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
          style={{ backgroundColor: tagColor, color: '#fff' }}
        >
          {step.tag}
        </span>
        {step.layer !== undefined && (
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            L{step.layer + 1}
          </span>
        )}
        <span className="text-[10px] ml-auto" style={{ color: 'var(--text-muted)' }}>
          E{step.epoch + 1} / S{step.sampleIndex + 1}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>

      {/* Technical note */}
      {depthMode === 'technical' && technicalNote && (
        <div
          className="rounded-lg text-[11px] font-mono leading-relaxed"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            color: 'var(--accent-cyan)',
            padding: '8px 10px',
          }}
        >
          {technicalNote}
        </div>
      )}

      {/* Formula */}
      {step.formula && <FormulaBox formula={step.formula} />}

      {/* Key values — compact */}
      <div className="flex flex-col gap-1.5 mt-auto">
        {Object.entries(step.values).map(([key, val]) => {
          if (typeof val === 'number') {
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{key}</span>
                <span className="font-mono text-[11px]" style={{
                  color: val > 0 ? 'var(--accent-green)' : val < 0 ? 'var(--accent-red)' : 'var(--text-muted)',
                }}>{typeof val === 'number' ? val.toFixed(4) : ''}</span>
              </div>
            )
          }
          if (Array.isArray(val) && typeof val[0] === 'number' && val.length <= 10) {
            return (
              <div key={key} className="flex flex-col gap-0.5">
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{key}</span>
                <div className="flex flex-wrap gap-0.5">
                  {(val as number[]).map((v, i) => (
                    <span key={i} className="font-mono text-[10px] px-1 rounded"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        color: v > 0 ? 'var(--accent-green)' : v < 0 ? 'var(--accent-red)' : 'var(--text-muted)',
                      }}>
                      {v.toFixed(3)}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
