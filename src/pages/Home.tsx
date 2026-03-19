import { useState } from 'react'
import { useSimStore } from '../store/useSimStore'
import { useTranslation } from '../i18n/useTranslation'

type FilterCategory = 'all' | 'ml' | 'dl' | 'nlp'

interface ModelCard {
  id: string
  icon: string
  modelKey: string
  filterCat: FilterCategory
  available: boolean
}

const MODEL_CARDS: ModelCard[] = [
  { id: 'ann', icon: '\uD83E\uDDE0', modelKey: 'ann', filterCat: 'dl', available: true },
  { id: 'cnn', icon: '\uD83D\uDDBC\uFE0F', modelKey: 'cnn', filterCat: 'dl', available: false },
  { id: 'rnn', icon: '\uD83D\uDD04', modelKey: 'rnn', filterCat: 'dl', available: false },
  { id: 'lstm', icon: '\uD83D\uDCE6', modelKey: 'lstm', filterCat: 'dl', available: false },
  { id: 'gru', icon: '\u26A1', modelKey: 'gru', filterCat: 'dl', available: false },
  { id: 'transformer', icon: '\uD83D\uDD2E', modelKey: 'transformer', filterCat: 'dl', available: false },
  { id: 'linear-regression', icon: '\uD83D\uDCC8', modelKey: 'linearRegression', filterCat: 'ml', available: false },
  { id: 'logistic-regression', icon: '\uD83C\uDFAF', modelKey: 'logisticRegression', filterCat: 'ml', available: false },
  { id: 'decision-tree', icon: '\uD83C\uDF33', modelKey: 'decisionTree', filterCat: 'ml', available: false },
  { id: 'random-forest', icon: '\uD83C\uDF32', modelKey: 'randomForest', filterCat: 'ml', available: false },
  { id: 'svm', icon: '\u2694\uFE0F', modelKey: 'svm', filterCat: 'ml', available: false },
  { id: 'knn', icon: '\uD83D\uDCCD', modelKey: 'knn', filterCat: 'ml', available: false },
  { id: 'xgboost', icon: '\uD83D\uDE80', modelKey: 'xgboost', filterCat: 'ml', available: false },
  { id: 'nlp-pipeline', icon: '\uD83D\uDCAC', modelKey: 'nlpPipeline', filterCat: 'nlp', available: false },
]

export function Home() {
  const { t } = useTranslation()
  const setActiveModel = useSimStore((s) => s.setActiveModel)
  const [filter, setFilter] = useState<FilterCategory>('all')

  const filtered = filter === 'all'
    ? MODEL_CARDS
    : MODEL_CARDS.filter((c) => c.filterCat === filter)

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t.home.filterAll },
    { key: 'ml', label: t.home.filterML },
    { key: 'dl', label: t.home.filterDL },
    { key: 'nlp', label: t.home.filterNLP },
  ]

  return (
    <div
      className="flex-1 flex flex-col items-center px-6 py-10"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Hero */}
      <div className="text-center mb-8 max-w-2xl">
        <h1
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}
        >
          {t.home.title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t.home.subtitle}
        </p>
      </div>

      {/* Filters */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-xl"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      >
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer border-none transition-all"
            style={{
              backgroundColor: filter === f.key ? 'var(--accent-blue)' : 'transparent',
              color: filter === f.key ? '#fff' : 'var(--text-muted)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full max-w-5xl">
        {filtered.map((card) => {
          const model = t.models[card.modelKey as keyof typeof t.models]
          return (
            <button
              key={card.id}
              onClick={() => {
                if (card.available) {
                  setActiveModel(card.id as any)
                  window.location.hash = `#/simulate/${card.id}`
                }
              }}
              className="p-4 rounded-xl flex flex-col gap-2 text-left cursor-pointer border transition-all group"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: card.available ? 'var(--border)' : 'var(--border)',
                opacity: card.available ? 1 : 0.5,
              }}
              disabled={!card.available}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{card.icon}</span>
                {!card.available && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                  >
                    {t.home.comingSoon}
                  </span>
                )}
                {card.available && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: 'var(--accent-green)', color: '#fff' }}
                  >
                    {t.home.simulate} \u2192
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                {model?.name ?? card.id}
              </h3>
              <p className="text-[11px] leading-snug" style={{ color: 'var(--text-muted)' }}>
                {model?.shortDesc ?? ''}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
