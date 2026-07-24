'use client';

import { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = '', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-8 group">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          {filename && (
            <span className="text-xs text-[#94a3b8] font-medium">{filename}</span>
          )}
          {language && (
            <span className="text-[10px] uppercase tracking-widest text-[#64748b] font-semibold">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#94a3b8] hover:text-white hover:bg-white/10 transition-all"
        >
          {copied ? <Check size={14} weight="bold" className="text-emerald-400" /> : <Copy size={14} weight="bold" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
