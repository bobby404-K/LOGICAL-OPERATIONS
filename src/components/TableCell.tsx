import React from 'react';
import { CellValue } from '../types';
import { Check, X } from 'lucide-react';

interface TableCellProps {
  value: CellValue;
  isActive: boolean;
  expectedValue?: boolean;
  showSolution?: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const TableCell: React.FC<TableCellProps> = ({
  value,
  isActive,
  expectedValue,
  showSolution,
  onClick,
  onKeyDown,
}) => {
  const isCorrect = showSolution && value !== null && expectedValue !== undefined && value === expectedValue;
  const isIncorrect = showSolution && value !== null && expectedValue !== undefined && value !== expectedValue;

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`w-full h-10 flex items-center justify-center font-mono font-bold text-sm select-none transition-all relative border-b border-r border-slate-200/80 dark:border-slate-800/80 focus:outline-none ${
        isActive
          ? 'ring-2 ring-indigo-500 z-10 bg-indigo-50/50 dark:bg-indigo-950/40'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
      }`}
      aria-label={`Cell value: ${value === true ? 'True' : value === false ? 'False' : 'Unfilled'}`}
    >
      {value === true && (
        <span className="w-7 h-7 flex items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700/60 shadow-2xs">
          T
        </span>
      )}

      {value === false && (
        <span className="w-7 h-7 flex items-center justify-center rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold border border-rose-300 dark:border-rose-700/60 shadow-2xs">
          F
        </span>
      )}

      {value === null && (
        <span className="w-5 h-5 flex items-center justify-center rounded border border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600 text-xs">
          ·
        </span>
      )}

      {/* Solution indicator badge if user explicitly toggled "Show Solution" */}
      {showSolution && expectedValue !== undefined && (
        <span
          className={`absolute right-1 top-1 text-[10px] font-bold px-1 rounded flex items-center gap-0.5 ${
            isCorrect
              ? 'text-emerald-600 dark:text-emerald-400'
              : isIncorrect
              ? 'bg-rose-500 text-white shadow-2xs'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200'
          }`}
          title={`Expected value: ${expectedValue ? 'T' : 'F'}`}
        >
          {isCorrect ? (
            <Check className="w-2.5 h-2.5" />
          ) : (
            <span>Exp: {expectedValue ? 'T' : 'F'}</span>
          )}
        </span>
      )}
    </button>
  );
};
