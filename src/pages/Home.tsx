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
    <div className="flex-1 flex flex-col items-center px-4 py-12">
      <h1
        className="text-3xl md:text-4xl font-bold mb-2 text-center"
        style={{ color: 'var(--text-primary)' }}
      >
        {t.home.title}
      </h1>
      <p className="text-base mb-8 text-center" style={{ color: 'var(--text-muted)' }}>
        {t.home.subtitle}
      </p>

      {/* Filters */}
      <div className="flex gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer border transition-colors"
            style={{
              backgroundColor: filter === f.key ? 'var(--accent-blue)' : 'var(--bg-secondary)',
              borderColor: filter === f.key ? 'var(--accent-blue)' : 'var(--border)',
              color: filter === f.key ? '#fff' : 'var(--text-muted)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        {filtered.map((card) => {
          const model = t.models[card.modelKey as keyof typeof t.models]
          return (
            <div
              key={card.id}
              className="p-5 rounded-xl flex flex-col gap-3 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                opacity: card.available ? 1 : 0.6,
              }}
            >
              <div className="text-3xl">{card.icon}</div>
              <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {model?.name ?? card.id}
              </h3>
              <p className="text-xs flex-1" style={{ color: 'var(--text-muted)' }}>
                {model?.shortDesc ?? ''}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {model?.category ?? ''}
                </span>
                {card.available ? (
                  <button
                    onClick={() => {
                      setActiveModel(card.id as any)
                      window.location.hash = `#/simulate/${card.id}`
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border-none"
                    style={{
                      backgroundColor: 'var(--accent-blue)',
                      color: '#fff',
                    }}
                  >
                    {t.home.simulate}
                  </button>
                ) : (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {t.home.comingSoon}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
