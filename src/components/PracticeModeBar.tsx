import React, { useState } from 'react';
import {
  Lightbulb,
  RotateCcw,
  CheckCircle,
  Dices,
  ChevronDown,
  Sparkles,
  PlusCircle,
  Eye,
} from 'lucide-react';
import { PracticeProblem, StudentColumn } from '../types';

interface PracticeModeBarProps {
  currentPractice: PracticeProblem | null;
  revealedHints: number;
  onNextHint: () => void;
  onReset: () => void;
  onNewRandom: (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => void;
  onSelectProblem: (problem: PracticeProblem) => void;
  problems: PracticeProblem[];
  studentColumns: StudentColumn[];
  onAddColumn: (header: string) => void;
  onCheckAll: () => void;
  onShowFullSolutionModal: () => void;
}

export const PracticeModeBar: React.FC<PracticeModeBarProps> = ({
  currentPractice,
  revealedHints,
  onNextHint,
  onReset,
  onNewRandom,
  onSelectProblem,
  problems,
  studentColumns,
  onAddColumn,
  onCheckAll,
  onShowFullSolutionModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!currentPractice) return null;

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Advanced: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-indigo-900/10 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Header row with challenge details and selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Practice Challenge
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                difficultyColors[currentPractice.difficulty]
              }`}
            >
              {currentPractice.difficulty}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{currentPractice.title}</span>
            <code className="text-sm font-mono px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-indigo-600 dark:text-indigo-300">
              {currentPractice.expression}
            </code>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {currentPractice.description}
          </p>
        </div>

        {/* Controls: Pick challenge or random challenge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-xs hover:border-indigo-400 transition"
            >
              <span>Challenges</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-30">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  Select a Problem
                </div>
                {problems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProblem(p);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-slate-800 transition ${
                      currentPractice.id === p.id ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="truncate">{p.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{p.difficulty}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNewRandom(currentPractice.difficulty)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
            title="Generate a new random problem"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Random</span>
          </button>
        </div>
      </div>

      {/* Recommended Sub-step suggestions */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs rounded-xl p-3 border border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended column sequence:</span>
          </span>
          {currentPractice.recommendedSteps.map((step) => {
            const alreadyAdded = studentColumns.some(
              (c) => c.header.replace(/\s+/g, '') === step.replace(/\s+/g, '')
            );
            return (
              <button
                key={step}
                onClick={() => !alreadyAdded && onAddColumn(step)}
                disabled={alreadyAdded}
                title={alreadyAdded ? 'Column already in workspace' : `Click to add column for ${step}`}
                className={`text-xs font-mono px-2 py-1 rounded-md border flex items-center gap-1 transition ${
                  alreadyAdded
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 cursor-default'
                    : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 active:scale-95'
                }`}
              >
                <span>{step}</span>
                {!alreadyAdded && <PlusCircle className="w-3 h-3 text-indigo-500" />}
              </button>
            );
          })}
        </div>

        {/* Global Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCheckAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs active:scale-95 transition"
            title="Check all student columns against truth table"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Check Workspace</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-medium transition"
            title="Reset student columns"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progressive Hints Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span>
              Progressive Hints ({revealedHints} of {currentPractice.hints.length} revealed)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {revealedHints < currentPractice.hints.length && (
              <button
                onClick={onNextHint}
                className="text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1"
              >
                <span>Show Next Hint</span>
              </button>
            )}

            <button
              onClick={onShowFullSolutionModal}
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 ml-2"
              title="Show complete solution guide"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Solution Guide</span>
            </button>
          </div>
        </div>

        {/* Revealed Hints list */}
        {revealedHints > 0 && (
          <div className="space-y-1.5">
            {currentPractice.hints.slice(0, revealedHints).map((hint, idx) => (
              <div
                key={idx}
                className="text-xs p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 flex items-start gap-2"
              >
                <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">
                  Hint {idx + 1}:
                </span>
                <span>{hint}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
