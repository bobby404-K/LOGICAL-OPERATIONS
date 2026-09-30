import { describe, it, expect } from 'vitest';
import { DpllAlgorithmSolver } from '../index';

describe('Concept 015: Dpll Algorithm', () => {
  const solver = new DpllAlgorithmSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('015');
    expect(solver.name).toBe('Dpll Algorithm');
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
});
