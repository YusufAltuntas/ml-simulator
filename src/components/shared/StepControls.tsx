import { useEffect } from 'react'
import { useSimStore } from '../../store/useSimStore'
import { useTranslation } from '../../i18n/useTranslation'

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
    const interval = setInterval(() => {
      nextStep()
    }, playSpeed)
    return () => clearInterval(interval)
  }, [isPlaying, playSpeed, nextStep])

  const btnStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    borderColor: 'var(--border)',
    color: 'var(--text-primary)',
  }

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl flex-wrap"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      <button
        onClick={reset}
        className="px-2 py-1.5 rounded-lg text-sm cursor-pointer border"
        style={btnStyle}
        title={t.simulator.controls.reset}
      >
        \u23EE
      </button>
      <button
        onClick={prevStep}
        disabled={stepIndex === 0}
        className="px-2 py-1.5 rounded-lg text-sm cursor-pointer border disabled:opacity-30"
        style={btnStyle}
        title={t.simulator.controls.prev}
      >
        \u25C0
      </button>
      <button
        onClick={togglePlaying}
        className="px-3 py-1.5 rounded-lg text-sm cursor-pointer border font-medium"
        style={{
          backgroundColor: isPlaying ? 'var(--accent-red)' : 'var(--accent-green)',
          borderColor: 'transparent',
          color: '#fff',
        }}
      >
        {isPlaying ? '\u23F8 ' + t.simulator.controls.pause : '\u25B6 ' + t.simulator.controls.play}
      </button>
      <button
        onClick={nextStep}
        disabled={stepIndex >= totalSteps - 1}
        className="px-2 py-1.5 rounded-lg text-sm cursor-pointer border disabled:opacity-30"
        style={btnStyle}
        title={t.simulator.controls.next}
      >
        \u25B6
      </button>

      <span className="text-sm font-mono mx-2" style={{ color: 'var(--text-muted)' }}>
        {t.simulator.controls.step} {stepIndex + 1} {t.simulator.controls.of} {totalSteps}
      </span>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t.simulator.controls.speed}
        </span>
        <input
          type="range"
          min={50}
          max={2000}
          step={50}
          value={playSpeed}
          onChange={(e) => setPlaySpeed(Number(e.target.value))}
          className="w-20 accent-[var(--accent-blue)]"
        />
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          {playSpeed}ms
        </span>
      </div>
    </div>
  )
}
