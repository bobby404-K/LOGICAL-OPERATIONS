import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  CellValue,
  PracticeProblem,
  StudentColumn,
  TruthAssignment,
  VariableName,
} from '../types';
import { parseLogicalExpression } from '../parser/parser';
import { generateTruthAssignments } from '../truth-table/generator';
import { checkStudentColumn } from '../truth-table/checker';
import { CURATED_PRACTICE_PROBLEMS, generateRandomProblem } from '../utils/practiceGenerator';
import { LogicPreset, PRESETS } from '../utils/presets';

export interface ActiveCellCoordinate {
  rowIndex: number;
  colId: string;
}

export function useLogicTable() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('logictable_theme') as 'dark' | 'light') || 'dark';
  });

  // Main expression state
  const [expression, setExpression] = useState<string>(
    '(p ∧ r ∧ s) ∨ (q ∧ t) ∨ (r ∧ ¬t)'
  );

  // Mode: Workspace, Practice, Concepts Explorer, or Agent Hub
  const [mode, setMode] = useState<'workspace' | 'practice' | 'concepts' | 'agent'>('workspace');

  // Modals
  const [isLearnModalOpen, setLearnModalOpen] = useState(false);
  const [learnModalTab, setLearnModalTab] = useState<'operators' | 'laws'>('operators');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [isExportModalOpen, setExportModalOpen] = useState(false);

  // Student manual columns
  const [studentColumns, setStudentColumns] = useState<StudentColumn[]>([]);

  // Active cell keyboard focus coordinate
  const [activeCell, setActiveCell] = useState<ActiveCellCoordinate | null>(null);

  const openLearnModal = useCallback((tab: 'operators' | 'laws' = 'operators') => {
    setLearnModalTab(tab);
    setLearnModalOpen(true);
  }, []);

  const loadLawIntoWorkspace = useCallback((tautologyExpr: string, lhs?: string, rhs?: string) => {
    setExpression(tautologyExpr);
    setMode('workspace');
    if (lhs && rhs) {
      const col1Id = `col-${Date.now()}-lhs`;
      const col2Id = `col-${Date.now() + 1}-rhs`;
      setStudentColumns([
        { id: col1Id, header: lhs, cells: {} },
        { id: col2Id, header: rhs, cells: {} },
      ]);
    } else {
      setStudentColumns([]);
    }
    setLearnModalOpen(false);
  }, []);

  // Practice Mode state
  const [currentPractice, setCurrentPractice] = useState<PracticeProblem | null>(
    () => CURATED_PRACTICE_PROBLEMS[0]
  );
  const [revealedHints, setRevealedHints] = useState<number>(0);

  // Keep a ref to expression input for toolbar insertion
  const expressionInputRef = useRef<HTMLInputElement>(null);

  // Parse expression and detect variables
  const { parseResult, parseError, variables, baseRows } = useMemo(() => {
    try {
      if (!expression.trim()) {
        return {
          parseResult: null,
          parseError: 'Enter a logical expression to generate the variable truth table.',
          variables: [] as VariableName[],
          baseRows: [] as TruthAssignment[],
        };
      }
      const res = parseLogicalExpression(expression);
      const rows = generateTruthAssignments(res.variables);
      return {
        parseResult: res,
        parseError: null,
        variables: res.variables,
        baseRows: rows,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid expression';
      return {
        parseResult: null,
        parseError: msg,
        variables: [] as VariableName[],
        baseRows: [] as TruthAssignment[],
      };
    }
  }, [expression]);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('logictable_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Insert operator symbol at cursor in expression input
  const insertOperator = useCallback((symbol: string) => {
    if (expressionInputRef.current) {
      const input = expressionInputRef.current;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const text = expression;
      const newText = text.slice(0, start) + symbol + text.slice(end);
      setExpression(newText);
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(start + symbol.length, start + symbol.length);
      }, 0);
    } else {
      setExpression((prev) => prev + symbol);
    }
  }, [expression]);

  // Add a new empty student column
  const addStudentColumn = useCallback((suggestedHeader: string = '') => {
    const newColId = `col-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newCol: StudentColumn = {
      id: newColId,
      header: suggestedHeader,
      cells: {},
    };
    setStudentColumns((prev) => [...prev, newCol]);
    // Set active cell to first row of new column
    setActiveCell({ rowIndex: 0, colId: newColId });
  }, []);

  // Update header of student column
  const updateStudentColumnHeader = useCallback((id: string, newHeader: string) => {
    setStudentColumns((prev) =>
      prev.map((col) => {
        if (col.id === id) {
          return {
            ...col,
            header: newHeader,
            // Reset check result when header changed
            checkResult: undefined,
          };
        }
        return col;
      })
    );
  }, []);

  // Delete student column
  const removeStudentColumn = useCallback((id: string) => {
    setStudentColumns((prev) => prev.filter((col) => col.id !== id));
    setActiveCell((prev) => (prev && prev.colId === id ? null : prev));
  }, []);

  // Set cell value in student column
  const setStudentCellValue = useCallback(
    (colId: string, rowIndex: number, value: CellValue) => {
      setStudentColumns((prev) =>
        prev.map((col) => {
          if (col.id === colId) {
            const newCells = { ...col.cells, [rowIndex]: value };
            return {
              ...col,
              cells: newCells,
              // If previously checked, reset solution view or re-check
              checkResult: col.checkResult
                ? { ...col.checkResult, checked: false }
                : undefined,
            };
          }
          return col;
        })
      );
    },
    []
  );

  // Fill student column helpers
  const fillStudentColumn = useCallback(
    (colId: string, fillType: 'ALL_T' | 'ALL_F' | 'CLEAR' | 'INVERT') => {
      const total = baseRows.length;
      setStudentColumns((prev) =>
        prev.map((col) => {
          if (col.id === colId) {
            const newCells: Record<number, CellValue> = {};
            for (let i = 0; i < total; i++) {
              if (fillType === 'ALL_T') newCells[i] = true;
              else if (fillType === 'ALL_F') newCells[i] = false;
              else if (fillType === 'CLEAR') newCells[i] = null;
              else if (fillType === 'INVERT') {
                const current = col.cells[i];
                newCells[i] = current === true ? false : current === false ? true : null;
              }
            }
            return {
              ...col,
              cells: newCells,
              checkResult: undefined,
            };
          }
          return col;
        })
      );
    },
    [baseRows.length]
  );

  // Check a specific student column
  const checkColumn = useCallback(
    (colId: string) => {
      setStudentColumns((prev) =>
        prev.map((col) => {
          if (col.id === colId) {
            const result = checkStudentColumn(col.header, col.cells, baseRows, variables);
            
            // Celebrate if correct!
            if (result.validSyntax && result.isCorrect) {
              try {
                confetti({
                  particleCount: 80,
                  spread: 60,
                  origin: { y: 0.6 },
                });
              } catch {
                // Ignore if canvas unavailable
              }
            }

            return {
              ...col,
              checkResult: {
                checked: true,
                validSyntax: result.validSyntax,
                errorMessage: result.errorMessage,
                isCorrect: result.isCorrect,
                unfilledCount: result.unfilledCount,
                incorrectCount: result.incorrectCount,
                totalRows: result.totalRows,
                showSolution: false, // Default to NOT showing solution
              },
            };
          }
          return col;
        })
      );
    },
    [baseRows, variables]
  );

  // Check all student columns
  const checkAllColumns = useCallback(() => {
    setStudentColumns((prev) =>
      prev.map((col) => {
        const result = checkStudentColumn(col.header, col.cells, baseRows, variables);
        return {
          ...col,
          checkResult: {
            checked: true,
            validSyntax: result.validSyntax,
            errorMessage: result.errorMessage,
            isCorrect: result.isCorrect,
            unfilledCount: result.unfilledCount,
            incorrectCount: result.incorrectCount,
            totalRows: result.totalRows,
            showSolution: col.checkResult?.showSolution || false,
          },
        };
      })
    );
  }, [baseRows, variables]);

  // Toggle reveal solution for a column (only when explicitly requested)
  const toggleShowSolution = useCallback(
    (colId: string) => {
      setStudentColumns((prev) =>
        prev.map((col) => {
          if (col.id === colId && col.checkResult) {
            return {
              ...col,
              checkResult: {
                ...col.checkResult,
                showSolution: !col.checkResult.showSolution,
              },
            };
          }
          return col;
        })
      );
    },
    []
  );

  // Reset workspace
  const resetWorkspace = useCallback(() => {
    setStudentColumns([]);
    setActiveCell(null);
  }, []);

  // Load a preset
  const loadPreset = useCallback(
    (preset: LogicPreset) => {
      setExpression(preset.expression);
      setStudentColumns([]);
      setActiveCell(null);
    },
    []
  );

  // Practice mode helpers
  const startPracticeProblem = useCallback((problem: PracticeProblem) => {
    setCurrentPractice(problem);
    setExpression(problem.expression);
    setRevealedHints(0);
    setStudentColumns([]);
    setActiveCell(null);
    setMode('practice');
  }, []);

  const nextPracticeHint = useCallback(() => {
    if (currentPractice && revealedHints < currentPractice.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
  }, [currentPractice, revealedHints]);

  const loadRandomPractice = useCallback(
    (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
      const problem = generateRandomProblem(difficulty);
      startPracticeProblem(problem);
    },
    [startPracticeProblem]
  );

  return {
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
    learnModalTab,
    setLearnModalTab,
    openLearnModal,
    loadLawIntoWorkspace,
    isHelpModalOpen,
    setHelpModalOpen,
    isExportModalOpen,
    setExportModalOpen,
    parseResult,
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
    presets: PRESETS,
    practiceProblems: CURATED_PRACTICE_PROBLEMS,
  };
}
