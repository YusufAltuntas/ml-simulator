import { useState, useRef, useEffect } from 'react'

interface HelpTooltipProps {
  title: string
  content: string
  size?: 'sm' | 'md'
}

export function HelpTooltip({ title, content, size = 'sm' }: HelpTooltipProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-full cursor-pointer border-none transition-all"
        style={{
          width: size === 'sm' ? 18 : 22,
          height: size === 'sm' ? 18 : 22,
          fontSize: size === 'sm' ? 10 : 12,
          backgroundColor: open ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
          color: open ? '#fff' : 'var(--text-muted)',
          border: `1px solid ${open ? 'var(--accent-blue)' : 'var(--border)'}`,
        }}
        aria-label={`Help: ${title}`}
      >
        ?
      </button>

      {open && (
        <div
          className="absolute z-50 rounded-xl shadow-lg"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            width: 280,
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: 8,
            padding: '14px 16px',
          }}
        >
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: -6,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 12,
              height: 12,
              backgroundColor: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border)',
              borderLeft: '1px solid var(--border)',
            }}
          />
          <div className="font-semibold text-sm mb-1.5" style={{ color: 'var(--accent-blue)' }}>
            {title}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {content}
          </p>
        </div>
      )}
    </div>
  )
}
