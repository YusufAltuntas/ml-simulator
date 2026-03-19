import { create } from 'zustand'
import { type ThemeMode, applyTheme } from '../theme/tokens'

export type Language = 'tr' | 'en'
export type ModelId =
  | 'ann' | 'cnn' | 'rnn' | 'lstm' | 'gru' | 'transformer'
  | 'linear-regression' | 'logistic-regression' | 'decision-tree'
  | 'random-forest' | 'svm' | 'knn' | 'xgboost' | 'nlp-pipeline'
  | null

export type DepthMode = 'intuitive' | 'technical'

interface SimState {
  theme: ThemeMode
  language: Language
  activeModel: ModelId
  stepIndex: number
  totalSteps: number
  isPlaying: boolean
  playSpeed: number
  depthMode: DepthMode

  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  setActiveModel: (model: ModelId) => void
  setStepIndex: (index: number) => void
  setTotalSteps: (total: number) => void
  nextStep: () => void
  prevStep: () => void
  setIsPlaying: (playing: boolean) => void
  togglePlaying: () => void
  setPlaySpeed: (speed: number) => void
  setDepthMode: (mode: DepthMode) => void
  reset: () => void
}

export const useSimStore = create<SimState>((set, get) => ({
  theme: 'dark',
  language: 'en',
  activeModel: null,
  stepIndex: 0,
  totalSteps: 0,
  isPlaying: false,
  playSpeed: 500,
  depthMode: 'intuitive',

  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    set({ theme: next })
  },
  setLanguage: (language) => set({ language }),
  toggleLanguage: () => set({ language: get().language === 'tr' ? 'en' : 'tr' }),
  setActiveModel: (activeModel) => set({ activeModel, stepIndex: 0, isPlaying: false }),
  setStepIndex: (stepIndex) => set({ stepIndex }),
  setTotalSteps: (totalSteps) => set({ totalSteps }),
  nextStep: () => {
    const { stepIndex, totalSteps } = get()
    if (stepIndex < totalSteps - 1) set({ stepIndex: stepIndex + 1 })
    else set({ isPlaying: false })
  },
  prevStep: () => set({ stepIndex: Math.max(0, get().stepIndex - 1) }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  togglePlaying: () => set({ isPlaying: !get().isPlaying }),
  setPlaySpeed: (playSpeed) => set({ playSpeed }),
  setDepthMode: (depthMode) => set({ depthMode }),
  reset: () => set({ stepIndex: 0, isPlaying: false }),
}))
