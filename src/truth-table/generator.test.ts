import { describe, it, expect } from 'vitest';
import { generateTruthAssignments } from './generator';
import { checkStudentColumn } from './checker';

describe('Truth Table Generator', () => {
  it('generates correct 2^3 = 8 rows for 3 variables', () => {
    const rows = generateTruthAssignments(['p', 'q', 'r']);
    expect(rows.length).toBe(8);

    // Standard discrete math truth table order:
    // p: 4 T, 4 F
    expect(rows.map((r) => r.p)).toEqual([true, true, true, true, false, false, false, false]);
    // q: 2 T, 2 F, 2 T, 2 F
    expect(rows.map((r) => r.q)).toEqual([true, true, false, false, true, true, false, false]);
    // r: T F T F T F T F
    expect(rows.map((r) => r.r)).toEqual([true, false, true, false, true, false, true, false]);
  });

  it('generates 2^5 = 32 rows for 5 variables matching prompt example', () => {
    const rows = generateTruthAssignments(['p', 'q', 'r', 's', 't']);
    expect(rows.length).toBe(32);
    // Row 0 is all True
    expect(rows[0]).toEqual({ p: true, q: true, r: true, s: true, t: true });
    // Row 1 has t = false
    expect(rows[1]).toEqual({ p: true, q: true, r: true, s: true, t: false });
    // Last row (31) is all False
    expect(rows[31]).toEqual({ p: false, q: false, r: false, s: false, t: false });
  });

  it('generates 2^10 = 1024 rows for 10 variables', () => {
    const rows = generateTruthAssignments(['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']);
    expect(rows.length).toBe(1024);
    expect(rows[0].p).toBe(true);
    expect(rows[1023].y).toBe(false);
  });
});

describe('Column Checking System', () => {
  const rows = generateTruthAssignments(['p', 'q']);
  // rows are:
  // 0: p=T, q=T
  // 1: p=T, q=F
  // 2: p=F, q=T
  // 3: p=F, q=F

  it('reports correct when student entered all matching values', () => {
    // Check column ¬p: expected [false, false, true, true]
    const studentCells = {
      0: false,
      1: false,
      2: true,
      3: true,
    };
    const result = checkStudentColumn('¬p', studentCells, rows, ['p', 'q']);
    expect(result.validSyntax).toBe(true);
    expect(result.isCorrect).toBe(true);
    expect(result.incorrectCount).toBe(0);
    expect(result.unfilledCount).toBe(0);
  });

  it('reports incorrect count without exposing expected values to student', () => {
    // Student made 1 mistake at row 1
    const studentCells = {
      0: false,
      1: true, // Should be false!
      2: true,
      3: true,
    };
    const result = checkStudentColumn('¬p', studentCells, rows, ['p', 'q']);
    expect(result.validSyntax).toBe(true);
    expect(result.isCorrect).toBe(false);
    expect(result.incorrectCount).toBe(1);
    expect(result.unfilledCount).toBe(0);
  });

  it('reports unfilled rows', () => {
    const studentCells = {
      0: false,
      // 1, 2, 3 missing
    };
    const result = checkStudentColumn('¬p', studentCells, rows, ['p', 'q']);
    expect(result.validSyntax).toBe(true);
    expect(result.isCorrect).toBe(false);
    expect(result.unfilledCount).toBe(3);
  });

  it('handles syntax errors in column header', () => {
    const result = checkStudentColumn('p ∧', {}, rows, ['p', 'q']);
    expect(result.validSyntax).toBe(false);
    expect(result.errorMessage).toContain('Syntax error');
  });

  it('handles unknown variables in column header', () => {
    const result = checkStudentColumn('r ∧ p', {}, rows, ['p', 'q']);
    expect(result.validSyntax).toBe(false);
    expect(result.errorMessage).toContain("references variable(s) not in table: r");
  });
});
