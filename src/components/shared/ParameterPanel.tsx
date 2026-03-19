import { useTranslation } from '../../i18n/useTranslation'
import { ANN_PRESETS, type ANNPreset } from '../../data/presets'
import { DepthToggle } from './DepthToggle'

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
      className="p-4 rounded-xl flex flex-col gap-4"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        {t.simulator.panels.parameters}
      </h3>

      {/* Preset */}
      <div className="flex flex-col gap-1">
        <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t.ann.params.preset}
        </label>
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
        <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t.ann.params.layers}
        </label>
        <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
          [{currentPreset.layers.join(' → ')}]
        </span>
      </div>

      {/* Activation */}
      <div className="flex flex-col gap-1">
        <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t.ann.params.activation}
        </label>
        <span className="font-mono text-sm" style={{ color: 'var(--accent-purple)' }}>
          {currentPreset.activations.join(', ')}
        </span>
      </div>

      {/* Learning Rate */}
      <div className="flex flex-col gap-1">
        <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t.ann.params.learningRate}: {learningRate.toFixed(3)}
        </label>
        <input
          type="range"
          min={0.001}
          max={1}
          step={0.001}
          value={learningRate}
          onChange={(e) => onLearningRateChange(Number(e.target.value))}
          className="accent-[var(--accent-blue)]"
        />
      </div>

      {/* Epochs */}
      <div className="flex flex-col gap-1">
        <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t.ann.params.epochs}
        </label>
        <input
          type="number"
          min={1}
          max={500}
          value={epochs}
          onChange={(e) => onEpochsChange(Number(e.target.value))}
          className="px-2 py-1.5 rounded-lg border text-sm w-full"
          style={inputStyle}
        />
      </div>

      {/* Dataset */}
      <div className="flex flex-col gap-1">
        <label className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t.ann.params.dataset}
        </label>
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {t.ann.datasets[currentPreset.datasetKey as keyof typeof t.ann.datasets] ??
            currentPreset.datasetKey}
        </span>
      </div>

      <div className="mt-2">
        <DepthToggle />
      </div>
    </div>
  )
}
