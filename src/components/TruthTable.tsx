import React, { useRef, useCallback, useEffect } from 'react';
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

  // Virtualizer for smooth rendering up to 1024 rows
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40, // 40px row height
    overscan: 10,
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
          // Advance down automatically for speed!
          if (rowIndex + 1 < rows.length) {
            setActiveCell({ rowIndex: rowIndex + 1, colId });
          }
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          onSetCellValue(colId, rowIndex, false);
          // Advance down automatically for speed!
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
      <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Truth Workspace
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            • {variables.length} base variable{variables.length > 1 ? 's' : ''} • {rows.length} rows •{' '}
            {studentColumns.length} student column{studentColumns.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {studentColumns.length > 0 && (
            <>
              <button
                type="button"
                onClick={onCheckAllColumns}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs active:scale-95 transition"
                title="Check all student columns"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Check All</span>
              </button>

              <button
                type="button"
                onClick={onResetWorkspace}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs active:scale-95 transition"
            title="Add a new custom column for your intermediate or final formula"
          >
            <Plus className="w-4 h-4" />
            <span>Add Column</span>
          </button>
        </div>
      </div>

      {/* Scrollable & Virtualized Table Workspace */}
      <div
        ref={tableContainerRef}
        className="overflow-auto max-h-[600px] border-b border-slate-200 dark:border-slate-800 relative math-grid-bg"
        tabIndex={0}
      >
        <table className="w-full border-collapse text-left text-sm table-fixed min-w-[700px]">
          {/* Sticky Table Header */}
          <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-slate-900 shadow-xs border-b border-slate-300 dark:border-slate-700">
            <tr>
              {/* Row index column header */}
              <th className="w-12 px-2 py-3 text-center text-xs font-mono font-medium text-slate-400 dark:text-slate-500 border-r border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 sticky left-0 z-30">
                #
              </th>

              {/* Locked Base Variable Headers */}
              {variables.map((variable) => (
                <th
                  key={variable}
                  className="w-16 px-3 py-3 text-center font-mono font-bold text-base text-indigo-700 dark:text-indigo-300 border-r border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/90"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>{variable}</span>
                    <span title="Locked base variable column">
                      <Lock className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />
                    </span>
                  </div>
                </th>
              ))}

              {/* Editable Student Column Headers */}
              {studentColumns.map((col) => (
                <th
                  key={col.id}
                  className="w-48 p-0 border-r border-slate-200 dark:border-slate-800 align-top"
                >
                  <StudentColumnHeader
                    column={col}
                    onUpdateHeader={onUpdateColumnHeader}
                    onRemove={onRemoveColumn}
                    onCheck={onCheckColumn}
                    onToggleShowSolution={onToggleShowSolution}
                    onFill={onFillColumn}
                  />
                </th>
              ))}

              {/* "+ Add Column" Header Button */}
              <th className={`${studentColumns.length === 0 ? 'w-64' : 'w-40'} px-3 py-3 align-middle text-center bg-indigo-50/40 dark:bg-indigo-950/20`}>
                <button
                  type="button"
                  onClick={onAddColumn}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 border border-dashed border-indigo-500 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl text-xs font-bold shadow-2xs transition active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>{studentColumns.length === 0 ? '+ Add First Column (e.g. ¬t)' : '+ Add Column'}</span>
                </button>
              </th>
            </tr>
          </thead>

          {/* Virtualized Body */}
          <tbody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const rowIndex = virtualRow.index;
              const rowAssignment = rows[rowIndex];

              return (
                <tr
                  key={rowIndex}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className={`flex items-center border-b border-slate-100 dark:border-slate-800/60 transition-colors ${
                    rowIndex % 2 === 0
                      ? 'bg-white dark:bg-slate-950'
                      : 'bg-slate-50/50 dark:bg-slate-900/40'
                  }`}
                >
                  {/* Row Index */}
                  <td className="w-12 h-10 flex items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-500 border-r border-slate-200/80 dark:border-slate-800/80 bg-inherit sticky left-0 z-10 shrink-0">
                    {rowIndex + 1}
                  </td>

                  {/* Variable Cells (Read-Only) */}
                  {variables.map((variable) => {
                    const val = rowAssignment[variable];
                    return (
                      <td
                        key={variable}
                        className="w-16 h-10 flex items-center justify-center font-mono font-bold text-sm border-r border-slate-200/80 dark:border-slate-800/80 shrink-0"
                      >
                        <span
                          className={`w-6 h-6 flex items-center justify-center rounded ${
                            val
                              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                              : 'text-rose-700 dark:text-rose-400 font-bold'
                          }`}
                        >
                          {val ? 'T' : 'F'}
                        </span>
                      </td>
                    );
                  })}

                  {/* Student Column Cells (Editable) */}
                  {studentColumns.map((col) => {
                    const isCellActive =
                      activeCell?.rowIndex === rowIndex && activeCell?.colId === col.id;
                    const cellVal = col.cells[rowIndex] ?? null;
                    const expected = expectedValuesMap[col.id]?.[rowIndex];

                    return (
                      <td
                        key={col.id}
                        className="w-48 h-10 p-0 border-r border-slate-200/80 dark:border-slate-800/80 shrink-0"
                      >
                        <TableCell
                          value={cellVal}
                          isActive={isCellActive}
                          expectedValue={expected}
                          showSolution={col.checkResult?.showSolution}
                          onClick={() => {
                            setActiveCell({ rowIndex, colId: col.id });
                            // Clicking toggles value: null -> true -> false -> null
                            const next =
                              cellVal === null ? true : cellVal === true ? false : null;
                            onSetCellValue(col.id, rowIndex, next);
                          }}
                          onKeyDown={(e) => handleCellKeyDown(e, rowIndex, col.id)}
                        />
                      </td>
                    );
                  })}

                  {/* Empty cell under add column */}
                  {studentColumns.length === 0 ? (
                    <td className="w-64 h-10 border-b border-slate-200/40 dark:border-slate-800/40 shrink-0 flex items-center justify-center text-[11px] text-slate-400 dark:text-slate-500 italic select-none">
                      {rowIndex === 0 ? '👈 Click "+ Add First Column" above' : '—'}
                    </td>
                  ) : (
                    <td className="w-40 h-10 border-b border-slate-200/40 dark:border-slate-800/40 shrink-0" />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Instructions */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            💡 <strong>Tip:</strong> Click cell or use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">T</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">F</kbd> keys.
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
