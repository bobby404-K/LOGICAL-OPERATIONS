import React, { useState } from 'react';
import { useLogicTable } from './store/useLogicStore';
import { Header } from './components/Header';
import { ExpressionInput } from './components/ExpressionInput';
import { OperatorToolbar } from './components/OperatorToolbar';
import { PresetsBar } from './components/PresetsBar';
import { PracticeModeBar } from './components/PracticeModeBar';
import { TruthTable } from './components/TruthTable';
import { LearnModal } from './components/LearnModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ExportModal } from './components/ExportModal';
import { SolutionGuideModal } from './components/SolutionGuideModal';
import { Info, HelpCircle } from 'lucide-react';

export function App() {
  const {
    theme,
    toggleTheme,
    expression,
    setExpression,
    expressionInputRef,
    insertOperator,
    mode,
    setMode,
    isLearnModalOpen,
    setLearnModalOpen,
    isHelpModalOpen,
    setHelpModalOpen,
    isExportModalOpen,
    setExportModalOpen,
    parseError,
    variables,
    baseRows,
    studentColumns,
    addStudentColumn,
    updateStudentColumnHeader,
    removeStudentColumn,
    setStudentCellValue,
    fillStudentColumn,
    checkColumn,
    checkAllColumns,
    toggleShowSolution,
    resetWorkspace,
    loadPreset,
    activeCell,
    setActiveCell,
    currentPractice,
    revealedHints,
    startPracticeProblem,
    nextPracticeHint,
    loadRandomPractice,
    presets,
    practiceProblems,
  } = useLogicTable();

  const [isSolutionGuideModalOpen, setSolutionGuideModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-200">
      {/* Top Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        mode={mode}
        setMode={setMode}
        onOpenLearn={() => setLearnModalOpen(true)}
        onOpenHelp={() => setHelpModalOpen(true)}
        onOpenExport={() => setExportModalOpen(true)}
      />

      {/* Main Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Practice Mode Banner (if in practice mode) */}
        {mode === 'practice' && (
          <PracticeModeBar
            currentPractice={currentPractice}
            revealedHints={revealedHints}
            onNextHint={nextPracticeHint}
            onReset={resetWorkspace}
            onNewRandom={loadRandomPractice}
            onSelectProblem={startPracticeProblem}
            problems={practiceProblems}
            studentColumns={studentColumns}
            onAddColumn={(header) => addStudentColumn(header)}
            onCheckAll={checkAllColumns}
            onShowFullSolutionModal={() => setSolutionGuideModalOpen(true)}
          />
        )}

        {/* Workspace Mode Presets (if in workspace mode) */}
        {mode === 'workspace' && (
          <PresetsBar
            presets={presets}
            currentExpression={expression}
            onSelectPreset={loadPreset}
          />
        )}

        {/* Expression Editor Section */}
        <section className="space-y-3">
          <ExpressionInput
            expression={expression}
            setExpression={setExpression}
            inputRef={expressionInputRef}
            parseError={parseError}
            variables={variables}
            rowCount={baseRows.length}
          />

          <OperatorToolbar onInsert={insertOperator} />
        </section>

        {/* Educational Principle Callout Banner */}
        <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 rounded-xl p-3 flex items-start sm:items-center justify-between gap-3 text-xs text-indigo-900 dark:text-indigo-200">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>
              <strong>Educational Canvas:</strong> The application generates only the basic variable combinations (
              <span className="font-mono font-semibold">{variables.join(', ')}</span>). Click{' '}
              <strong className="underline underline-offset-2">+ Add Column</strong> to construct intermediate expressions and evaluate truth values manually!
            </span>
          </div>
          <button
            onClick={() => setHelpModalOpen(true)}
            className="hidden md:flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Shortcuts</span>
          </button>
        </div>

        {/* Interactive Truth Table Workspace */}
        <section>
          <TruthTable
            variables={variables}
            rows={baseRows}
            studentColumns={studentColumns}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            onAddColumn={() => addStudentColumn()}
            onUpdateColumnHeader={updateStudentColumnHeader}
            onRemoveColumn={removeStudentColumn}
            onSetCellValue={setStudentCellValue}
            onFillColumn={fillStudentColumn}
            onCheckColumn={checkColumn}
            onCheckAllColumns={checkAllColumns}
            onToggleShowSolution={toggleShowSolution}
            onResetWorkspace={resetWorkspace}
          />
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 py-4 mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>Logic Table</strong> — Desmos for Discrete Mathematics.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Supports up to 10 variables (1024 rows)</span>
            <span>•</span>
            <button
              onClick={() => setLearnModalOpen(true)}
              className="hover:text-indigo-500 transition"
            >
              Operator Reference
            </button>
            <span>•</span>
            <button
              onClick={() => setExportModalOpen(true)}
              className="hover:text-indigo-500 transition"
            >
              Export
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LearnModal
        isOpen={isLearnModalOpen}
        onClose={() => setLearnModalOpen(false)}
      />

      <ShortcutsModal
        isOpen={isHelpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setExportModalOpen(false)}
        variables={variables}
        studentColumns={studentColumns}
        rows={baseRows}
      />

      <SolutionGuideModal
        isOpen={isSolutionGuideModalOpen}
        onClose={() => setSolutionGuideModalOpen(false)}
        problem={currentPractice}
      />
    </div>
  );
}

export default App;
