import { CellValue, TruthAssignment, VariableName } from '../types';
import { parseLogicalExpression } from '../parser/parser';
import { evaluateAST } from '../parser/evaluator';

export interface ColumnCheckResult {
  validSyntax: boolean;
  errorMessage?: string;
  isCorrect?: boolean;
  unfilledCount?: number;
  incorrectCount?: number;
  totalRows?: number;
  expectedValues?: boolean[]; // Calculated internally, only shown if explicitly revealed
  incorrectRowIndices?: number[]; // Row indices that do not match
}

export function checkStudentColumn(
  columnHeader: string,
  studentCells: Record<number, CellValue>,
  rows: TruthAssignment[],
  availableVariables: VariableName[]
): ColumnCheckResult {
  const trimmedHeader = columnHeader.trim();

  if (!trimmedHeader) {
    return {
      validSyntax: false,
      errorMessage: 'Column expression is empty. Enter an expression to check (e.g., ¬q, p ∧ q).',
    };
  }

  // Attempt to parse the column header
  let parseResult;
  try {
    parseResult = parseLogicalExpression(trimmedHeader);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid logical expression.';
    return {
      validSyntax: false,
      errorMessage: `Syntax error: ${message}`,
    };
  }

  // Check if expression uses variables that are not in the current base table
  const availableSet = new Set(availableVariables);
  const unknownVars = parseResult.variables.filter((v) => !availableSet.has(v));
  if (unknownVars.length > 0) {
    return {
      validSyntax: false,
      errorMessage: `Expression references variable(s) not in table: ${unknownVars.join(', ')}. Available: ${availableVariables.join(', ')}.`,
    };
  }

  // Compute expected values for each row
  const totalRows = rows.length;
  const expectedValues: boolean[] = new Array(totalRows);
  const incorrectRowIndices: number[] = [];
  let unfilledCount = 0;

  for (let i = 0; i < totalRows; i++) {
    const expected = evaluateAST(parseResult.ast, rows[i]);
    expectedValues[i] = expected;

    const studentVal = studentCells[i];
    if (studentVal === null || studentVal === undefined) {
      unfilledCount++;
    } else if (studentVal !== expected) {
      incorrectRowIndices.push(i);
    }
  }

  const isCorrect = unfilledCount === 0 && incorrectRowIndices.length === 0;

  return {
    validSyntax: true,
    isCorrect,
    unfilledCount,
    incorrectCount: incorrectRowIndices.length,
    totalRows,
    expectedValues,
    incorrectRowIndices,
  };
}
