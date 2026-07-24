'use client';

import { SearchModal } from './SearchModal';
import { useState, useEffect } from 'react';

export function SearchModalWrapper() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener('open-search', handler);
    return () => document.removeEventListener('open-search', handler);
  }, []);
  return <SearchModal open={open} onClose={() => setOpen(false)} />;
}
