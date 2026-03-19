import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSimStore } from '../store/useSimStore'
import { ANNSimulator, type SimStep } from '../simulators/ANNSimulator'
import { datasetMap } from '../data/datasets'
import { ANN_PRESETS, type ANNPreset } from '../data/presets'
import { ParameterPanel } from '../components/shared/ParameterPanel'
import { StepControls } from '../components/shared/StepControls'
import { LossChart } from '../components/shared/LossChart'
import { InfoPanel } from '../components/layout/InfoPanel'
import { NetworkSVG } from '../components/visualizers/NetworkSVG'
import { DecisionBoundary } from '../components/visualizers/DecisionBoundary'

export function Simulator() {
  const stepIndex = useSimStore((s) => s.stepIndex)
  const setTotalSteps = useSimStore((s) => s.setTotalSteps)
  const reset = useSimStore((s) => s.reset)

  const [preset, setPreset] = useState<ANNPreset>(ANN_PRESETS[0])
  const [learningRate, setLearningRate] = useState(preset.learningRate)
  const [epochs, setEpochs] = useState(preset.epochs)
  const [simKey, setSimKey] = useState(0)

  const handlePresetChange = useCallback((p: ANNPreset) => {
    setPreset(p)
    setLearningRate(p.learningRate)
    setEpochs(p.epochs)
    reset()
    setSimKey((k) => k + 1)
  }, [reset])

  const handleLearningRateChange = useCallback((lr: number) => {
    setLearningRate(lr)
    reset()
    setSimKey((k) => k + 1)
  }, [reset])

  const handleEpochsChange = useCallback((e: number) => {
    setEpochs(e)
    reset()
    setSimKey((k) => k + 1)
  }, [reset])

  const { steps, simulator } = useMemo(() => {
    const dataset = datasetMap[preset.datasetKey]
    const sim = new ANNSimulator({
      layers: preset.layers,
      activations: preset.activations,
      learningRate,
      epochs,
      dataset,
    })
    const steps = sim.generateAllSteps()
    return { steps, simulator: sim }
  }, [preset, learningRate, epochs, simKey])

  useEffect(() => {
    setTotalSteps(steps.length)
  }, [steps.length, setTotalSteps])

  const currentStep: SimStep | null = steps[stepIndex] ?? null

  const currentWeights = useMemo(() => {
    for (let i = Math.min(stepIndex, steps.length - 1); i >= 0; i--) {
      if (steps[i].weights) return steps[i].weights!
    }
    return simulator.getWeightsAtEpoch(0)
  }, [stepIndex, steps, simulator])

  const lossData = useMemo(() => {
    return simulator.getLossUpToStep(stepIndex)
  }, [simulator, stepIndex])

  const activations = useMemo(() => {
    if (!currentStep) return undefined
    const layers = preset.layers
    const result: number[][] = []

    const inputVals = currentStep.values.input as number[] | undefined
    result.push(inputVals ?? new Array(layers[0]).fill(0))

    const aVal = currentStep.values.a as number[] | undefined
    const zVal = currentStep.values.z as number[] | undefined

    if (currentStep.type === 'forward_a' && aVal && currentStep.layer !== undefined) {
      for (let l = 0; l < layers.length - 1; l++) {
        result.push(l === currentStep.layer ? aVal : new Array(layers[l + 1]).fill(0))
      }
    } else if (currentStep.type === 'forward_z' && zVal && currentStep.layer !== undefined) {
      for (let l = 0; l < layers.length - 1; l++) {
        result.push(l === currentStep.layer ? zVal : new Array(layers[l + 1]).fill(0))
      }
    } else {
      for (let l = 0; l < layers.length - 1; l++) {
        result.push(new Array(layers[l + 1]).fill(0))
      }
    }

    return result
  }, [currentStep, preset.layers])

  const dataset = datasetMap[preset.datasetKey]

  return (
    <div
      className="flex-1 flex flex-col lg:flex-row gap-3 overflow-hidden"
      style={{ padding: '12px 16px', height: 'calc(100vh - 52px)' }}
    >
      {/* Left Column: Parameters */}
      <div className="w-full lg:w-56 xl:w-64 shrink-0 overflow-y-auto">
        <ParameterPanel
          currentPreset={preset}
          onPresetChange={handlePresetChange}
          learningRate={learningRate}
          onLearningRateChange={handleLearningRateChange}
          epochs={epochs}
          onEpochsChange={handleEpochsChange}
        />
      </div>

      {/* Center Column: Visualizations */}
      <div className="flex-1 flex flex-col gap-3 min-w-0 min-h-0">
        {/* Network - takes proportional space */}
        <div className="flex-[2] min-h-0">
          <NetworkSVG
            layers={preset.layers}
            weights={currentWeights}
            step={currentStep}
            activations={activations}
          />
        </div>

        {/* Bottom row: Decision Boundary + Loss Chart side by side */}
        <div className="flex-[3] grid grid-cols-2 gap-3 min-h-0">
          <DecisionBoundary
            layers={preset.layers}
            activations={preset.activations}
            weights={currentWeights}
            dataset={dataset}
          />
          <LossChart data={lossData} />
        </div>

        {/* Step Controls - fixed height */}
        <div className="shrink-0">
          <StepControls />
        </div>
      </div>

      {/* Right Column: Info Panel */}
      <div className="w-full lg:w-56 xl:w-72 shrink-0 min-h-0">
        <InfoPanel step={currentStep} />
      </div>
    </div>
  )
}
