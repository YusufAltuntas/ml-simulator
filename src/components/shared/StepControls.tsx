import { useEffect } from 'react'
import { useSimStore } from '../../store/useSimStore'
import { useTranslation } from '../../i18n/useTranslation'
import { HelpTooltip } from './HelpTooltip'

export function StepControls() {
  const { t } = useTranslation()
  const stepIndex = useSimStore((s) => s.stepIndex)
  const totalSteps = useSimStore((s) => s.totalSteps)
  const isPlaying = useSimStore((s) => s.isPlaying)
  const playSpeed = useSimStore((s) => s.playSpeed)
  const nextStep = useSimStore((s) => s.nextStep)
  const prevStep = useSimStore((s) => s.prevStep)
  const togglePlaying = useSimStore((s) => s.togglePlaying)
  const setPlaySpeed = useSimStore((s) => s.setPlaySpeed)
  const reset = useSimStore((s) => s.reset)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(nextStep, playSpeed)
    return () => clearInterval(interval)
  }, [isPlaying, playSpeed, nextStep])

  const btnBase = "px-2 py-1 rounded-lg text-xs cursor-pointer border transition-colors"

  return (
    <div
      className="flex items-center gap-2 rounded-xl flex-wrap"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '8px 12px',
      }}
    >
      <HelpTooltip title={t.help.stepControls.title} content={t.help.stepControls.content} />

      <button onClick={reset} className={btnBase}
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
        \u23EE
      </button>
      <button onClick={prevStep} disabled={stepIndex === 0}
        className={`${btnBase} disabled:opacity-30`}
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
        \u25C0
      </button>
      <button onClick={togglePlaying}
        className={`${btnBase} font-medium`}
        style={{
          backgroundColor: isPlaying ? 'var(--accent-red)' : 'var(--accent-green)',
          borderColor: 'transparent', color: '#fff',
          minWidth: 70,
        }}>
        {isPlaying ? '\u23F8 ' + t.simulator.controls.pause : '\u25B6 ' + t.simulator.controls.play}
      </button>
      <button onClick={nextStep} disabled={stepIndex >= totalSteps - 1}
        className={`${btnBase} disabled:opacity-30`}
        style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
        \u25B6
      </button>

      <div className="flex items-center gap-1 mx-1"
        style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '3px 8px',
          borderRadius: 8,
          border: '1px solid var(--border)',
        }}>
        <span className="text-[10px] font-mono" style={{ color: 'var(--accent-blue)' }}>
          {stepIndex + 1}
        </span>
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>/</span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          {totalSteps}
        </span>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          {t.simulator.controls.speed}
        </span>
        <input
          type="range" min={50} max={2000} step={50}
          value={playSpeed}
          onChange={(e) => setPlaySpeed(Number(e.target.value))}
          className="w-16 accent-[var(--accent-blue)]"
        />
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          {playSpeed}ms
        </span>
      </div>
    </div>
  )
}
