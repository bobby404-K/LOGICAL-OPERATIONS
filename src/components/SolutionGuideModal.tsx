import React, { useMemo } from 'react';
import { X, CheckCircle2, BookOpen } from 'lucide-react';
import { PracticeProblem } from '../types';
import { parseLogicalExpression } from '../parser/parser';
import { generateTruthAssignments } from '../truth-table/generator';
import { evaluateAST } from '../parser/evaluator';

interface SolutionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: PracticeProblem | null;
}

export const SolutionGuideModal: React.FC<SolutionGuideModalProps> = ({
  isOpen,
  onClose,
  problem,
}) => {
  if (!isOpen || !problem) return null;

  // Compute solution columns
  const solutionData = useMemo(() => {
    try {
      const rootRes = parseLogicalExpression(problem.expression);
      const rows = generateTruthAssignments(rootRes.variables);

      // Parse each recommended step
      const stepASTs = problem.recommendedSteps.map((step) => {
        try {
          return { step, ast: parseLogicalExpression(step).ast, error: null };
        } catch (e: unknown) {
          return { step, ast: null, error: String(e) };
        }
      });

      const evaluatedSteps = stepASTs.map((s) => {
        if (!s.ast) return { step: s.step, values: [] };
        const vals = rows.map((r) => evaluateAST(s.ast!, r));
        return { step: s.step, values: vals };
      });

      return {
        variables: rootRes.variables,
        rows,
        evaluatedSteps,
      };
    } catch {
      return null;
    }
  }, [problem]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full p-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Step-by-Step Solution Guide
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {problem.expression}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Below is the full mathematical decomposition with intermediate columns and the final truth values for comparison:
          </div>

          {solutionData && (
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-center text-xs font-mono">
                <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    {solutionData.variables.map((v) => (
                      <th key={v} className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400">
                        {v}
                      </th>
                    ))}
                    {solutionData.evaluatedSteps.map((s, idx) => (
                      <th
                        key={idx}
                        className={`py-2.5 px-4 border-l border-slate-200 dark:border-slate-700 ${
                          idx === solutionData.evaluatedSteps.length - 1
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold'
                            : ''
                        }`}
                      >
                        {s.step}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {solutionData.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`border-b border-slate-100 dark:border-slate-800/60 ${
                        rIdx % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/50 dark:bg-slate-900/40'
                      }`}
                    >
                      <td className="py-1.5 px-2 text-slate-400">{rIdx + 1}</td>
                      {solutionData.variables.map((v) => (
                        <td key={v} className="py-1.5 px-3 font-bold">
                          {row[v] ? (
                            <span className="text-emerald-600">T</span>
                          ) : (
                            <span className="text-rose-600">F</span>
                          )}
                        </td>
                      ))}
                      {solutionData.evaluatedSteps.map((s, idx) => {
                        const val = s.values[rIdx];
                        return (
                          <td
                            key={idx}
                            className={`py-1.5 px-4 border-l border-slate-100 dark:border-slate-800/60 font-bold ${
                              idx === solutionData.evaluatedSteps.length - 1
                                ? 'bg-indigo-50/40 dark:bg-indigo-950/30'
                                : ''
                            }`}
                          >
                            {val ? (
                              <span className="text-emerald-600 dark:text-emerald-400">T</span>
                            ) : (
                              <span className="text-rose-600 dark:text-rose-400">F</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
