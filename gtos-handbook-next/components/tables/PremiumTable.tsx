'use client';

import React, { useMemo } from 'react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface PremiumTableProps {
  columns: Column[];
  data: Record<string, any>[];
  caption?: string;
}

export function PremiumTable({ columns, data, caption }: PremiumTableProps) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const va = a[sortKey] ?? '', vb = b[sortKey] ?? '';
      const na = Number(va), nb = Number(vb);
      if (!isNaN(na) && !isNaN(nb)) return sortDir === 'asc' ? na - nb : nb - na;
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [data, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="premium-table overflow-x-auto my-8">
      {caption && (
        <div className="px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] border-b border-[var(--border-default)] bg-[var(--bg-secondary)]">
          {caption}
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={col.sortable !== false ? 'cursor-pointer hover:text-[var(--accent)] select-none' : ''}
                onClick={() => col.sortable !== false && handleSort(col.key)}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable !== false && sortKey === col.key && (
                    <span className="text-[10px]">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
