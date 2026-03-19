import { useSimStore } from '../../store/useSimStore'
import { useTranslation } from '../../i18n/useTranslation'

export function Navbar() {
  const { t } = useTranslation()
  const theme = useSimStore((s) => s.theme)
  const language = useSimStore((s) => s.language)
  const toggleTheme = useSimStore((s) => s.toggleTheme)
  const toggleLanguage = useSimStore((s) => s.toggleLanguage)
  const activeModel = useSimStore((s) => s.activeModel)
  const setActiveModel = useSimStore((s) => s.setActiveModel)

  return (
    <nav
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        height: 48,
      }}
      className="sticky top-0 z-50 px-4 flex items-center justify-between shrink-0"
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setActiveModel(null)
            window.location.hash = '#/'
          }}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="text-base font-bold tracking-tight">{t.nav.title}</span>
        </button>
        {activeModel && (
          <>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-blue)' }}>
              {t.models[activeModel as keyof typeof t.models]?.name ?? activeModel}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {activeModel && (
          <button
            onClick={() => {
              setActiveModel(null)
              window.location.hash = '#/'
            }}
            className="px-2.5 py-1 rounded-lg text-xs cursor-pointer border font-medium"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            \u2190 {t.nav.home}
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg text-sm cursor-pointer border flex items-center justify-center"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
          title={t.nav.theme}
        >
          {theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
        </button>

        <button
          onClick={toggleLanguage}
          className="h-8 px-2.5 rounded-lg text-xs cursor-pointer border font-bold"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border)',
            color: 'var(--accent-blue)',
          }}
        >
          {language === 'tr' ? 'EN' : 'TR'}
        </button>
      </div>
    </nav>
  )
}
