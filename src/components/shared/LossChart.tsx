import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTranslation } from '../../i18n/useTranslation'

interface LossChartProps {
  data: { epoch: number; loss: number }[]
}

export function LossChart({ data }: LossChartProps) {
  const { t } = useTranslation()

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {t.simulator.panels.lossChart}
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="epoch"
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            stroke="var(--border)"
            label={{
              value: 'Epoch',
              position: 'insideBottom',
              offset: -5,
              fill: 'var(--text-muted)',
              fontSize: 11,
            }}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            stroke="var(--border)"
            label={{
              value: 'Loss',
              angle: -90,
              position: 'insideLeft',
              fill: 'var(--text-muted)',
              fontSize: 11,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text-primary)',
              fontSize: 12,
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
