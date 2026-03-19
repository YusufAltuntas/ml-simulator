import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTranslation } from '../../i18n/useTranslation'
import { HelpTooltip } from './HelpTooltip'

interface LossChartProps {
  data: { epoch: number; loss: number }[]
}

export function LossChart({ data }: LossChartProps) {
  const { t } = useTranslation()

  return (
    <div
      className="rounded-xl flex flex-col"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        padding: '8px 12px',
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <h4 className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t.simulator.panels.lossChart}
        </h4>
        <HelpTooltip title={t.help.lossChart.title} content={t.help.lossChart.content} />
      </div>
      <ResponsiveContainer width="100%" height="100%" minHeight={120}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="epoch"
            tick={{ fill: 'var(--text-muted)', fontSize: 9 }}
            stroke="var(--border)"
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 9 }}
            stroke="var(--border)"
            tickLine={false}
            width={35}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text-primary)',
              fontSize: 11,
              padding: '6px 10px',
            }}
            formatter={(value) => [(value as number).toFixed(6), 'Loss']}
          />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="var(--accent-cyan)"
            strokeWidth={2}
            dot={false}
            animationDuration={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
