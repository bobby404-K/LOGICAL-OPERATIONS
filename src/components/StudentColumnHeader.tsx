import React, { useState, useRef, useEffect } from 'react';
import {
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  MoreVertical,
  Trash2,
  RotateCcw,
  Edit2,
} from 'lucide-react';
import { StudentColumn } from '../types';

interface StudentColumnHeaderProps {
  column: StudentColumn;
  onUpdateHeader: (id: string, newHeader: string) => void;
  onRemove: (id: string) => void;
  onCheck: (id: string) => void;
  onToggleShowSolution: (id: string) => void;
  onFill: (id: string, type: 'ALL_T' | 'ALL_F' | 'CLEAR' | 'INVERT') => void;
}

const QUICK_OPERATORS = ['¬', '∧', '∨', '→', '↔', '⊕', '(', ')'];

export const StudentColumnHeader: React.FC<StudentColumnHeaderProps> = ({
  column,
  onUpdateHeader,
  onRemove,
  onCheck,
  onToggleShowSolution,
  onFill,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [headerDraft, setHeaderDraft] = useState(column.header);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHeaderDraft(column.header);
  }, [column.header]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    onUpdateHeader(column.id, headerDraft.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setHeaderDraft(column.header);
      setIsEditing(false);
    }
  };

  const handleInsertSymbol = (sym: string) => {
    if (inputRef.current) {
      const el = inputRef.current;
      const start = el.selectionStart || 0;
      const end = el.selectionEnd || 0;
      const next = headerDraft.slice(0, start) + sym + headerDraft.slice(end);
      setHeaderDraft(next);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + sym.length, start + sym.length);
      }, 0);
    } else {
      setHeaderDraft((prev) => prev + sym);
    }
  };

  const { checkResult } = column;

  return (
    <div className="flex flex-col justify-between h-full p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Top Header Label & Menu */}
      <div className="flex items-center justify-between gap-1 mb-2">
        {isEditing ? (
          <div className="flex-1 space-y-1.5">
            <input
              ref={inputRef}
              type="text"
              value={headerDraft}
              onChange={(e) => setHeaderDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              placeholder="e.g. ¬q, p ∧ q"
              className="w-full font-mono text-sm px-2 py-1 bg-white dark:bg-slate-950 border border-indigo-500 rounded-md outline-none"
            />
            {/* Quick math symbol inserter for header */}
            <div className="flex flex-wrap gap-1">
              {QUICK_OPERATORS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleInsertSymbol(sym);
                  }}
                  className="w-5 h-5 flex items-center justify-center font-mono text-xs rounded bg-slate-200 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="group/hdr flex items-center gap-1.5 cursor-pointer max-w-[140px] truncate"
            title="Click to rename column expression"
          >
            <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400 truncate">
              {column.header || <span className="italic text-slate-400 font-normal">Untitled</span>}
            </span>
            <Edit2 className="w-3 h-3 text-slate-400 opacity-0 group-hover/hdr:opacity-100 transition shrink-0" />
          </div>
        )}

        {/* More options menu */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            aria-label="Column actions"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-30 text-xs">
              <button
                onClick={() => {
                  onFill(column.id, 'ALL_T');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Fill all True (T)
              </button>
              <button
                onClick={() => {
                  onFill(column.id, 'ALL_F');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Fill all False (F)
              </button>
              <button
                onClick={() => {
                  onFill(column.id, 'INVERT');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Invert T ↔ F
              </button>
              <button
                onClick={() => {
                  onFill(column.id, 'CLEAR');
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3 text-slate-400" />
                <span>Clear Column</span>
              </button>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
              <button
                onClick={() => {
                  onRemove(column.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 flex items-center gap-1.5"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Column</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action / Feedback Footer */}
      <div className="space-y-1.5 mt-auto">
        {/* Check Button */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onCheck(column.id)}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs active:scale-95 transition"
            title="Check column values against mathematical truth evaluation"
          >
            <Check className="w-3 h-3" />
            <span>Check Column</span>
          </button>

          {/* Educational solution toggle: only reveals when student explicitly clicks */}
          {checkResult?.checked && checkResult.validSyntax && (
            <button
              type="button"
              onClick={() => onToggleShowSolution(column.id)}
              className={`p-1 rounded-md border text-xs transition ${
                checkResult.showSolution
                  ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
              title={checkResult.showSolution ? 'Hide expected solution' : 'Show expected solution'}
            >
              {checkResult.showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Check Feedback Badge */}
        {checkResult?.checked && (
          <div className="text-[11px] leading-tight">
            {!checkResult.validSyntax ? (
              <div
                className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium truncate"
                title={checkResult.errorMessage}
              >
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span className="truncate">Syntax Error</span>
              </div>
            ) : checkResult.isCorrect ? (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>✓ Correct! All match.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5 text-rose-600 dark:text-rose-400">
                <div className="flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>✗ Some values incorrect</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>
                    Errors: <strong className="text-rose-500">{checkResult.incorrectCount}</strong>
                  </span>
                  {checkResult.unfilledCount ? (
                    <span>Empty: {checkResult.unfilledCount}</span>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
