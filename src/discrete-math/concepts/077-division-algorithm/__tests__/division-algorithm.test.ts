import { describe, it, expect } from 'vitest';
import { DivisionAlgorithmSolver } from '../index';

describe('Concept 077: Division Algorithm', () => {
  const solver = new DivisionAlgorithmSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('077');
    expect(solver.name).toBe('Division Algorithm');
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
