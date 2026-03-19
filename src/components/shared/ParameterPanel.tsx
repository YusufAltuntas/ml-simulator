import { useTranslation } from '../../i18n/useTranslation'
import { ANN_PRESETS, type ANNPreset } from '../../data/presets'
import { DepthToggle } from './DepthToggle'
import { HelpTooltip } from './HelpTooltip'

interface ParameterPanelProps {
  currentPreset: ANNPreset
  onPresetChange: (preset: ANNPreset) => void
  learningRate: number
  onLearningRateChange: (lr: number) => void
  epochs: number
  onEpochsChange: (epochs: number) => void
}

export function ParameterPanel({
  currentPreset,
  onPresetChange,
  learningRate,
  onLearningRateChange,
  epochs,
  onEpochsChange,
}: ParameterPanelProps) {
  const { t, language } = useTranslation()

  const inputStyle = {
    backgroundColor: 'var(--bg-primary)',
    borderColor: 'var(--border)',
    color: 'var(--text-primary)',
  }

  return (
    <div
      className="rounded-xl flex flex-col gap-3 h-full"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '14px 16px',
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t.simulator.panels.parameters}
        </h3>
        <DepthToggle />
      </div>

      {/* Preset */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {t.ann.params.preset}
          </label>
          <HelpTooltip title={t.help.preset.title} content={t.help.preset.content} />
        </div>
        <select
          value={currentPreset.id}
          onChange={(e) => {
            const preset = ANN_PRESETS.find((p) => p.id === e.target.value)
            if (preset) onPresetChange(preset)
          }}
          className="px-2 py-1.5 rounded-lg border text-sm"
          style={inputStyle}
        >
          {ANN_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name[language]}
            </option>
          ))}
        </select>
      </div>

      {/* Network Layers */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {t.ann.params.layers}
          </label>
          <HelpTooltip title={t.help.layers.title} content={t.help.layers.content} />
        </div>
        <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
          [{currentPreset.layers.join(' \u2192 ')}]
        </span>
      </div>

      {/* Activation + Dataset row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t.ann.params.activation}
            </label>
            <HelpTooltip title={t.help.activation.title} content={t.help.activation.content} />
          </div>
          <span className="font-mono text-xs" style={{ color: 'var(--accent-purple)' }}>
            {currentPreset.activations.join(', ')}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t.ann.params.dataset}
            </label>
            <HelpTooltip title={t.help.dataset.title} content={t.help.dataset.content} />
          </div>
          <span className="text-xs" style={{ color: 'var(--accent-green)' }}>
            {t.ann.datasets[currentPreset.datasetKey as keyof typeof t.ann.datasets] ??
              currentPreset.datasetKey}
          </span>
        </div>
      </div>

      {/* Learning Rate */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {t.ann.params.learningRate}:
            <span className="font-mono ml-1" style={{ color: 'var(--accent-orange)' }}>
              {learningRate.toFixed(3)}
            </span>
          </label>
          <HelpTooltip title={t.help.learningRate.title} content={t.help.learningRate.content} />
        </div>
        <input
          type="range"
          min={0.001}
          max={1}
          step={0.001}
          value={learningRate}
          onChange={(e) => onLearningRateChange(Number(e.target.value))}
          className="w-full accent-[var(--accent-blue)]"
        />
      </div>

      {/* Epochs */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {t.ann.params.epochs}
          </label>
          <HelpTooltip title={t.help.epochs.title} content={t.help.epochs.content} />
        </div>
        <input
          type="number"
          min={1}
          max={500}
          value={epochs}
          onChange={(e) => onEpochsChange(Number(e.target.value))}
          className="px-2 py-1 rounded-lg border text-sm w-full"
          style={inputStyle}
        />
      </div>
    </div>
  )
}
