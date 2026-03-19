import { useSimStore } from '../store/useSimStore'
import { en } from './en'
import { tr } from './tr'

const translations = { en, tr } as const

export function useTranslation() {
  const language = useSimStore((s) => s.language)
  return { t: translations[language], language }
}
