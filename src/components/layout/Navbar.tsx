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
      }}
      className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setActiveModel(null)
            window.location.hash = '#/'
          }}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="text-xl font-bold">{t.nav.title}</span>
        </button>
        {activeModel && (
          <span style={{ color: 'var(--text-muted)' }} className="text-sm">
            / {t.models[activeModel as keyof typeof t.models]?.name ?? activeModel}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {activeModel && (
          <button
            onClick={() => {
              setActiveModel(null)
              window.location.hash = '#/'
            }}
            className="px-3 py-1.5 rounded-lg text-sm cursor-pointer border"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            {t.nav.home}
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg text-sm cursor-pointer border"
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
          className="px-3 py-1.5 rounded-lg text-sm cursor-pointer border font-semibold"
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
