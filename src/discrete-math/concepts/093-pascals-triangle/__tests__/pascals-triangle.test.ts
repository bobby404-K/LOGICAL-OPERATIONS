import { describe, it, expect } from 'vitest';
import { PascalsTriangleSolver } from '../index';

describe('Concept 093: Pascals Triangle', () => {
  const solver = new PascalsTriangleSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('093');
    expect(solver.name).toBe('Pascals Triangle');
  });

  it('evaluates logical expressions correctly', () => {
    const res = solver.evaluate('p ∨ ¬p');
    expect(res.isValid).toBe(true);
    expect(res.satisfactionDensity).toBe(1.0); // Tautology
  });

  it('verifies logical invariants under truth assignments', () => {
    expect(solver.verifyInvariant(true, true)).toBe(true);
    expect(solver.verifyInvariant(false, false)).toBe(true);
  });

  it('generates accurate Pascal Triangle rows with symmetry and power-of-two sums', () => {
    const row4 = solver.generateRow(4);
    expect(row4).toEqual([1, 4, 6, 4, 1]);
    expect(solver.verifyRowSymmetry(row4)).toBe(true);
    expect(row4.reduce((a, b) => a + b, 0)).toBe(solver.getRowSum(4));

    const tri = solver.generateTriangle(4);
    expect(tri.length).toBe(4);
    expect(tri[0]).toEqual([1]);
    expect(tri[3]).toEqual([1, 3, 3, 1]);
  });

});
