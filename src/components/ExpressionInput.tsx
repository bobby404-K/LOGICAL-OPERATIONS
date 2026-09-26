import React, { RefObject } from 'react';
import { CheckCircle2, AlertCircle, X, Hash, Binary } from 'lucide-react';
import { VariableName } from '../types';

interface ExpressionInputProps {
  expression: string;
  setExpression: (expr: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  parseError: string | null;
  variables: VariableName[];
  rowCount: number;
  onInsertSymbol: (symbol: string) => void;
}

const QUICK_OPS = [
  { symbol: '¬', label: 'NOT', title: 'Negation (NOT, ~)' },
  { symbol: '∧', label: 'AND', title: 'Conjunction (AND, &)' },
  { symbol: '∨', label: 'OR', title: 'Disjunction (OR, |)' },
  { symbol: '→', label: 'IMPLIES', title: 'Implication (->)' },
  { symbol: '↔', label: 'IFF', title: 'Biconditional (<->)' },
  { symbol: '⊕', label: 'XOR', title: 'Exclusive OR (^)' },
  { symbol: '↑', label: 'NAND', title: 'NAND' },
  { symbol: '↓', label: 'NOR', title: 'NOR' },
  { symbol: '(', label: '(', title: 'Open parenthesis' },
  { symbol: ')', label: ')', title: 'Close parenthesis' },
];

export const ExpressionInput: React.FC<ExpressionInputProps> = ({
  expression,
  setExpression,
  inputRef,
  parseError,
  variables,
  rowCount,
  onInsertSymbol,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 transition-colors space-y-3">
      {/* Top Header: Label & Stats */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="logic-expression-input"
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          Logical Expression
        </label>

        {variables.length > 0 && !parseError && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800/50">
              {variables.length} Variables ({variables.join(', ')})
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-medium border border-purple-200 dark:border-purple-800/50">
              {rowCount} Rows (2<sup>{variables.length}</sup>)
            </span>
          </div>
        )}
      </div>

      {/* Expression Input Bar with Clear Button */}
      <div className="relative flex items-center">
        <input
          id="logic-expression-input"
          ref={inputRef}
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g. (p ∧ q) ∨ (¬q ∧ r)"
          autoComplete="off"
          spellCheck={false}
          className={`w-full font-mono text-base sm:text-lg px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
            parseError
              ? 'border-rose-400 dark:border-rose-500/80 focus:ring-rose-400/20'
              : 'border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20'
          } text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-4 transition`}
        />
        {expression && (
          <button
            onClick={() => setExpression('')}
            className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            title="Clear expression"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Integrated Quick Operator Inserter + Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
        {/* Quick math symbol buttons */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Insert:
          </span>
          {QUICK_OPS.map((op) => (
            <button
              key={op.symbol}
              type="button"
              onClick={() => onInsertSymbol(op.symbol)}
              title={op.title}
              className="h-8 min-w-8 px-2 flex items-center justify-center font-mono font-bold text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition active:scale-95"
            >
              {op.symbol}
            </button>
          ))}
        </div>

        {/* Status indicator */}
        <div className="text-xs">
          {parseError ? (
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          ) : variables.length > 0 ? (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Valid syntax</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
