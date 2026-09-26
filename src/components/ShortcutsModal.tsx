import React from 'react';
import { X, Keyboard, ArrowRight } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'T / t', desc: 'Set active cell to True (T) and move down' },
    { key: 'F / f', desc: 'Set active cell to False (F) and move down' },
    { key: 'Space / Enter', desc: 'Toggle cell between (Empty → True → False)' },
    { key: 'Backspace / Del', desc: 'Clear the active cell' },
    { key: '↑ / ↓ / ← / →', desc: 'Navigate between table cells' },
    { key: 'Tab / Shift+Tab', desc: 'Move to next / previous column' },
  ];

  const syntaxShortcuts = [
    { symbol: '¬', text: 'NOT, ~ or !' },
    { symbol: '∧', text: 'AND, & or /\\' },
    { symbol: '∨', text: 'OR, | or \\/' },
    { symbol: '→', text: '-> or IMPLIES' },
    { symbol: '↔', text: '<-> or IFF' },
    { symbol: '⊕', text: 'XOR or ^' },
    { symbol: '↑', text: 'NAND' },
    { symbol: '↓', text: 'NOR' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Keyboard Shortcuts & Syntax
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Speed up truth table construction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Workspace Cell Navigation
            </h3>
            <div className="space-y-2">
              {shortcuts.map((s) => (
                <div
                  key={s.key}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                >
                  <span className="text-slate-600 dark:text-slate-300">{s.desc}</span>
                  <kbd className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-semibold text-slate-800 dark:text-slate-200 shadow-2xs">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Expression Typing Aliases
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {syntaxShortcuts.map((s) => (
                <div
                  key={s.symbol}
                  className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60"
                >
                  <span className="font-mono font-bold text-base text-indigo-600 dark:text-indigo-400">
                    {s.symbol}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {s.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
