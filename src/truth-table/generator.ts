import { TruthAssignment, VariableName } from '../types';

/**
 * Generates all 2^n truth assignments in standard mathematical order.
 * Row 0 is all True; Row (2^n - 1) is all False.
 * 
 * Example for ["p", "q", "r"]:
 * p: T T T T F F F F (blocks of 4)
 * q: T T F F T T F F (blocks of 2)
 * r: T F T F T F T F (blocks of 1)
 */
export function generateTruthAssignments(variables: VariableName[]): TruthAssignment[] {
  const n = variables.length;
  if (n === 0) return [];
  
  const totalRows = Math.pow(2, n);
  const rows: TruthAssignment[] = new Array(totalRows);

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const assignment: TruthAssignment = {};
    for (let colIndex = 0; colIndex < n; colIndex++) {
      const variable = variables[colIndex];
      const blockSize = Math.pow(2, n - 1 - colIndex);
      const isTrue = Math.floor(rowIndex / blockSize) % 2 === 0;
      assignment[variable] = isTrue;
    }
    rows[rowIndex] = assignment;
  }

  return rows;
}
