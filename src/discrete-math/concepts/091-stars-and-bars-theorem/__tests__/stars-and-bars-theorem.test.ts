import { describe, it, expect } from 'vitest';
import { StarsAndBarsTheoremSolver } from '../index';

describe('Concept 091: Stars And Bars Theorem', () => {
  const solver = new StarsAndBarsTheoremSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('091');
    expect(solver.name).toBe('Stars And Bars Theorem');
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

  it('correctly evaluates Stars and Bars non-negative and positive distributions', () => {
    // 5 stars in 3 bins (non-negative): C(5 + 3 - 1, 3 - 1) = C(7, 2) = 21
    expect(solver.countNonNegativeSolutions(5, 3)).toBe(21);
    // 5 stars in 3 bins (positive): C(5 - 1, 3 - 1) = C(4, 2) = 6
    expect(solver.countPositiveSolutions(5, 3)).toBe(6);

    const compositions = solver.generateCompositions(4, 2, 1);
    expect(compositions).toEqual([[1, 3], [2, 2], [3, 1]]);
    expect(compositions.length).toBe(solver.countPositiveSolutions(4, 2));
  });

});
