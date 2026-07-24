import React from 'react';
import { Info, Warning, CheckCircle, XCircle, Lightbulb } from '@phosphor-icons/react';

type CalloutType = 'info' | 'warning' | 'success' | 'danger' | 'tip';

interface CalloutBlockProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: React.ElementType; className: string }> = {
  info:    { icon: Info, className: 'border-l-[var(--accent)] bg-[rgba(59,130,246,0.04)]' },
  warning: { icon: Warning, className: 'border-l-[var(--warning)] bg-[rgba(217,119,6,0.04)]' },
  success: { icon: CheckCircle, className: 'border-l-[var(--success)] bg-[rgba(5,150,105,0.04)]' },
  danger:  { icon: XCircle, className: 'border-l-[var(--danger)] bg-[rgba(225,17,72,0.04)]' },
  tip:     { icon: Lightbulb, className: 'border-l-[var(--info)] bg-[rgba(124,58,237,0.04)]' },
};

export function CalloutBlock({ type = 'info', title, children }: CalloutBlockProps) {
  const { icon: Icon, className } = config[type];
  return (
    <div className={`my-6 pl-5 pr-6 py-4 rounded-r-2xl border-l-[3px] ${className}`}>
      <div className="flex items-start gap-3">
        <Icon size={20} weight="bold" className="mt-0.5 shrink-0 text-[var(--accent)]" />
        <div>
          {title && <strong className="block text-sm font-bold text-[var(--text-primary)] mb-1">{title}</strong>}
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
