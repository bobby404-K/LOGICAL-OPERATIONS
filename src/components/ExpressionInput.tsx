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
}

export const ExpressionInput: React.FC<ExpressionInputProps> = ({
  expression,
  setExpression,
  inputRef,
  parseError,
  variables,
  rowCount,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 transition-colors">
      <div className="flex flex-col gap-3">
        {/* Top Label */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="logic-expression-input"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
          >
            <span>Logical Expression</span>
            <span className="text-[11px] font-normal lowercase text-slate-400 dark:text-slate-500">
              (supports symbols & text aliases like AND, OR, NOT)
            </span>
          </label>

          {expression && (
            <button
              onClick={() => setExpression('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 transition"
              title="Clear expression"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Input Field Bar */}
        <div className="relative flex items-center">
          <input
            id="logic-expression-input"
            ref={inputRef}
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter a logical expression... e.g. (p ∧ r ∧ s) ∨ (q ∧ t) ∨ (r ∧ ¬t)"
            autoComplete="off"
            spellCheck={false}
            className={`w-full font-mono text-base sm:text-lg px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border ${
              parseError
                ? 'border-rose-400 dark:border-rose-500/80 focus:ring-rose-400/20'
                : 'border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20'
            } text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-4 transition`}
          />
        </div>

        {/* Status / Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          {parseError ? (
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          ) : variables.length > 0 ? (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Valid syntax • Ready for manual truth table construction</span>
            </div>
          ) : (
            <div className="text-slate-400 dark:text-slate-500">
              Type variables like p, q, r and connectives.
            </div>
          )}

          {/* Variables and Rows Stats Badges */}
          {variables.length > 0 && !parseError && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-mono border border-indigo-200 dark:border-indigo-800/50">
                <Hash className="w-3.5 h-3.5" />
                <span>
                  {variables.length} {variables.length === 1 ? 'Var' : 'Vars'} (
                  {variables.join(', ')})
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-mono border border-purple-200 dark:border-purple-800/50">
                <Binary className="w-3.5 h-3.5" />
                <span>
                  {rowCount} Rows (2
                  <sup className="text-[10px]">{variables.length}</sup>)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
