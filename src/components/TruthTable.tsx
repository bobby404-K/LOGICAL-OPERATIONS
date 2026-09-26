import React, { useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Plus, Lock, CheckCheck, RotateCcw } from 'lucide-react';
import { CellValue, StudentColumn, TruthAssignment, VariableName } from '../types';
import { StudentColumnHeader } from './StudentColumnHeader';
import { TableCell } from './TableCell';
import { checkStudentColumn } from '../truth-table/checker';

interface TruthTableProps {
  variables: VariableName[];
  rows: TruthAssignment[];
  studentColumns: StudentColumn[];
  activeCell: { rowIndex: number; colId: string } | null;
  setActiveCell: (coord: { rowIndex: number; colId: string } | null) => void;
  onAddColumn: () => void;
  onUpdateColumnHeader: (id: string, header: string) => void;
  onRemoveColumn: (id: string) => void;
  onSetCellValue: (colId: string, rowIndex: number, value: CellValue) => void;
  onFillColumn: (colId: string, type: 'ALL_T' | 'ALL_F' | 'CLEAR' | 'INVERT') => void;
  onCheckColumn: (id: string) => void;
  onCheckAllColumns: () => void;
  onToggleShowSolution: (id: string) => void;
  onResetWorkspace: () => void;
}

// Consistent column width classes applied to BOTH header and virtualized rows
const W_INDEX = 'w-14 min-w-[56px] max-w-[56px] shrink-0';
const W_VAR = 'w-20 min-w-[80px] max-w-[80px] shrink-0';
const W_STUDENT = 'w-56 min-w-[224px] max-w-[224px] shrink-0';
const W_ADD = 'w-48 min-w-[192px] max-w-[192px] shrink-0';

export const TruthTable: React.FC<TruthTableProps> = ({
  variables,
  rows,
  studentColumns,
  activeCell,
  setActiveCell,
  onAddColumn,
  onUpdateColumnHeader,
  onRemoveColumn,
  onSetCellValue,
  onFillColumn,
  onCheckColumn,
  onCheckAllColumns,
  onToggleShowSolution,
  onResetWorkspace,
}) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Virtualizer for smooth 60fps rendering up to 1024 rows
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40, // 40px row height
    overscan: 12,
  });

  // Calculate expected values for columns where student requested "Show Solution"
  const expectedValuesMap = React.useMemo(() => {
    const map: Record<string, boolean[]> = {};
    for (const col of studentColumns) {
      if (col.checkResult?.showSolution) {
        const res = checkStudentColumn(col.header, col.cells, rows, variables);
        if (res.expectedValues) {
          map[col.id] = res.expectedValues;
        }
      }
    }
    return map;
  }, [studentColumns, rows, variables]);

  // Global Keyboard Navigation Handler
  const handleCellKeyDown = useCallback(
    (e: React.KeyboardEvent, rowIndex: number, colId: string) => {
      const colIndex = studentColumns.findIndex((c) => c.id === colId);

      switch (e.key) {
        case 't':
        case 'T':
          e.preventDefault();
          onSetCellValue(colId, rowIndex, true);
          if (rowIndex + 1 < rows.length) {
            setActiveCell({ rowIndex: rowIndex + 1, colId });
          }
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          onSetCellValue(colId, rowIndex, false);
          if (rowIndex + 1 < rows.length) {
            setActiveCell({ rowIndex: rowIndex + 1, colId });
          }
          break;

        case 'Backspace':
        case 'Delete':
          e.preventDefault();
          onSetCellValue(colId, rowIndex, null);
          break;

        case ' ':
        case 'Enter': {
          e.preventDefault();
          const curr = studentColumns[colIndex]?.cells[rowIndex];
          const next = curr === null || curr === undefined ? true : curr === true ? false : null;
          onSetCellValue(colId, rowIndex, next);
          break;
        }

        case 'ArrowUp':
          e.preventDefault();
          if (rowIndex > 0) {
            setActiveCell({ rowIndex: rowIndex - 1, colId });
          }
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (rowIndex + 1 < rows.length) {
            setActiveCell({ rowIndex: rowIndex + 1, colId });
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (colIndex > 0) {
            setActiveCell({ rowIndex, colId: studentColumns[colIndex - 1].id });
          }
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (colIndex + 1 < studentColumns.length) {
            setActiveCell({ rowIndex, colId: studentColumns[colIndex + 1].id });
          }
          break;

        case 'Tab':
          if (!e.shiftKey) {
            if (colIndex + 1 < studentColumns.length) {
              e.preventDefault();
              setActiveCell({ rowIndex, colId: studentColumns[colIndex + 1].id });
            } else if (rowIndex + 1 < rows.length) {
              e.preventDefault();
              setActiveCell({ rowIndex: rowIndex + 1, colId: studentColumns[0].id });
            }
          } else {
            if (colIndex > 0) {
              e.preventDefault();
              setActiveCell({ rowIndex, colId: studentColumns[colIndex - 1].id });
            } else if (rowIndex > 0) {
              e.preventDefault();
              setActiveCell({
                rowIndex: rowIndex - 1,
                colId: studentColumns[studentColumns.length - 1].id,
              });
            }
          }
          break;
      }
    },
    [studentColumns, rows.length, onSetCellValue, setActiveCell]
  );

  if (variables.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400">
        <p className="text-base font-medium">No valid variables detected.</p>
        <p className="text-xs text-slate-400 mt-1">
          Enter an expression using variables like p, q, r to generate the base truth assignments.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Truth Workspace
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            • {variables.length} base variables • {rows.length} rows •{' '}
            {studentColumns.length} student column{studentColumns.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {studentColumns.length > 0 && (
            <>
              <button
                type="button"
                onClick={onCheckAllColumns}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs active:scale-95 transition cursor-pointer"
                title="Check all student columns"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Check All</span>
              </button>

              <button
                type="button"
                onClick={onResetWorkspace}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
                title="Clear all student columns"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Columns</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onAddColumn}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs active:scale-95 transition cursor-pointer"
            title="Add a custom column to evaluate your intermediate or final formula"
          >
            <Plus className="w-4 h-4" />
            <span>Add Column</span>
          </button>
        </div>
      </div>

      {/* Scrollable & Virtualized Table Workspace with Pixel-Perfect Flex Columns */}
      <div
        ref={tableContainerRef}
        className="overflow-auto max-h-[600px] border-b border-slate-200 dark:border-slate-800 relative bg-white dark:bg-slate-950 focus:outline-none"
        tabIndex={0}
      >
        <div className="w-fit min-w-full">
          {/* Sticky Header with matching flex columns */}
          <div className="sticky top-0 z-20 flex bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-700 select-none">
            {/* Row index # */}
            <div className={`${W_INDEX} h-14 flex items-center justify-center text-xs font-mono font-bold text-slate-500 dark:text-slate-400 border-r border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 sticky left-0 z-30`}>
              #
            </div>

            {/* Base Variables (p, q, r, ...) */}
            {variables.map((variable) => (
              <div
                key={variable}
                className={`${W_VAR} h-14 flex items-center justify-center font-mono font-bold text-base text-indigo-700 dark:text-indigo-300 border-r border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900`}
              >
                <div className="flex items-center gap-1">
                  <span>{variable}</span>
                  <span title="Locked base variable column">
                    <Lock className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />
                  </span>
                </div>
              </div>
            ))}

            {/* Student Column Headers */}
            {studentColumns.map((col) => (
              <div
                key={col.id}
                className={`${W_STUDENT} border-r border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900`}
              >
                <StudentColumnHeader
                  column={col}
                  onUpdateHeader={onUpdateColumnHeader}
                  onRemove={onRemoveColumn}
                  onCheck={onCheckColumn}
                  onToggleShowSolution={onToggleShowSolution}
                  onFill={onFillColumn}
                />
              </div>
            ))}

            {/* "+ Add Column" Header Button */}
            <div className={`${studentColumns.length === 0 ? 'w-64' : W_ADD} h-14 p-2 flex items-center justify-center bg-indigo-50/50 dark:bg-indigo-950/30 border-r border-slate-300 dark:border-slate-700`}>
              <button
                type="button"
                onClick={onAddColumn}
                className="w-full h-full flex items-center justify-center gap-1.5 px-3 border border-dashed border-indigo-500 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-xl text-xs font-bold shadow-2xs transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{studentColumns.length === 0 ? '+ Add First Column' : '+ Add Column'}</span>
              </button>
            </div>
          </div>

          {/* Virtualized Body Rows with Exact Matching Flex Columns */}
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
              width: '100%',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const rowIndex = virtualRow.index;
              const rowAssignment = rows[rowIndex];

              return (
                <div
                  key={rowIndex}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className={`flex items-center border-b border-slate-200 dark:border-slate-800 ${
                    rowIndex % 2 === 0
                      ? 'bg-white dark:bg-slate-950'
                      : 'bg-slate-50/70 dark:bg-slate-900/40'
                  }`}
                >
                  {/* Row Index # */}
                  <div className={`${W_INDEX} h-10 flex items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-500 border-r border-slate-200 dark:border-slate-800 bg-inherit sticky left-0 z-10`}>
                    {rowIndex + 1}
                  </div>

                  {/* Variable Cells (Read-Only) */}
                  {variables.map((variable) => {
                    const val = rowAssignment[variable];
                    return (
                      <div
                        key={variable}
                        className={`${W_VAR} h-10 flex items-center justify-center font-mono font-bold text-sm border-r border-slate-200 dark:border-slate-800`}
                      >
                        <span
                          className={`w-6 h-6 flex items-center justify-center rounded font-bold ${
                            val
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-rose-700 dark:text-rose-400'
                          }`}
                        >
                          {val ? 'T' : 'F'}
                        </span>
                      </div>
                    );
                  })}

                  {/* Student Column Cells (Editable) */}
                  {studentColumns.map((col) => {
                    const isCellActive =
                      activeCell?.rowIndex === rowIndex && activeCell?.colId === col.id;
                    const cellVal = col.cells[rowIndex] ?? null;
                    const expected = expectedValuesMap[col.id]?.[rowIndex];

                    return (
                      <div
                        key={col.id}
                        className={`${W_STUDENT} h-10 p-0 border-r border-slate-200 dark:border-slate-800`}
                      >
                        <TableCell
                          value={cellVal}
                          isActive={isCellActive}
                          expectedValue={expected}
                          showSolution={col.checkResult?.showSolution}
                          onClick={() => {
                            setActiveCell({ rowIndex, colId: col.id });
                            const next =
                              cellVal === null ? true : cellVal === true ? false : null;
                            onSetCellValue(col.id, rowIndex, next);
                          }}
                          onKeyDown={(e) => handleCellKeyDown(e, rowIndex, col.id)}
                        />
                      </div>
                    );
                  })}

                  {/* Empty cell under add column */}
                  <div
                    className={`${studentColumns.length === 0 ? 'w-64' : W_ADD} h-10 border-r border-slate-100 dark:border-slate-800/40 flex items-center justify-center text-[11px] text-slate-400 dark:text-slate-500 italic select-none`}
                  >
                    {studentColumns.length === 0 && rowIndex === 0 ? '👈 Click "+ Add First Column"' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Footer Instructions */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            💡 <strong>Tip:</strong> Click a cell or use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">T</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">F</kbd> keys.
          </span>
          <span className="hidden md:inline">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">↓</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">→</kbd> to navigate.
          </span>
        </div>

        <div className="text-slate-400 dark:text-slate-500">
          Showing 1 to {rows.length} of {rows.length} rows
        </div>
      </div>
    </div>
  );
};
