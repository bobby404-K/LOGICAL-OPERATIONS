import React from 'react';

interface OperatorToolbarProps {
  onInsert: (symbol: string) => void;
}

interface OperatorDef {
  symbol: string;
  name: string;
  alias: string;
  precedence: string;
  color: string;
}

const OPERATORS: OperatorDef[] = [
  { symbol: '¬', name: 'NOT', alias: 'NOT, ~', precedence: 'Precedence: 1 (Highest)', color: 'hover:border-rose-400 hover:text-rose-400' },
  { symbol: '∧', name: 'AND', alias: 'AND, &', precedence: 'Precedence: 2', color: 'hover:border-blue-400 hover:text-blue-400' },
  { symbol: '∨', name: 'OR', alias: 'OR, |', precedence: 'Precedence: 3', color: 'hover:border-emerald-400 hover:text-emerald-400' },
  { symbol: '→', name: 'IMPLIES', alias: '->, IMPLIES', precedence: 'Precedence: 4', color: 'hover:border-amber-400 hover:text-amber-400' },
  { symbol: '↔', name: 'IFF', alias: '<->, IFF', precedence: 'Precedence: 5 (Lowest)', color: 'hover:border-purple-400 hover:text-purple-400' },
  { symbol: '⊕', name: 'XOR', alias: 'XOR, ^', precedence: 'Precedence: 3', color: 'hover:border-cyan-400 hover:text-cyan-400' },
  { symbol: '↑', name: 'NAND', alias: 'NAND', precedence: 'Precedence: 2', color: 'hover:border-pink-400 hover:text-pink-400' },
  { symbol: '↓', name: 'NOR', alias: 'NOR', precedence: 'Precedence: 3', color: 'hover:border-orange-400 hover:text-orange-400' },
  { symbol: '(', name: '(', alias: 'Open parenthesis', precedence: 'Overrides precedence', color: 'hover:border-indigo-400 hover:text-indigo-400' },
  { symbol: ')', name: ')', alias: 'Close parenthesis', precedence: 'Overrides precedence', color: 'hover:border-indigo-400 hover:text-indigo-400' },
];

const COMMON_VARS = ['p', 'q', 'r', 's', 't'];

export const OperatorToolbar: React.FC<OperatorToolbarProps> = ({ onInsert }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1.5 hidden sm:inline">
        Operators:
      </span>

      {OPERATORS.map((op) => (
        <button
          key={op.symbol}
          type="button"
          onClick={() => onInsert(op.symbol)}
          title={`${op.name} (${op.alias}) • ${op.precedence}`}
          className={`group relative h-9 min-w-9 px-2.5 flex items-center justify-center font-mono font-bold text-base rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all active:scale-95 ${op.color}`}
        >
          {op.symbol}
          <span className="sr-only">{op.name}</span>
        </button>
      ))}

      <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1.5 hidden sm:inline">
        Variables:
      </span>

      {COMMON_VARS.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onInsert(v)}
          className="h-9 w-8 flex items-center justify-center font-mono font-semibold text-sm rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 shadow-xs active:scale-95 transition"
        >
          {v}
        </button>
      ))}
    </div>
  );
};
