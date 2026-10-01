import { describe, it, expect } from 'vitest';
import { WeakMathematicalInductionSolver } from '../index';

describe('Concept 072: Weak Mathematical Induction', () => {
  const solver = new WeakMathematicalInductionSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('072');
    expect(solver.name).toBe('Weak Mathematical Induction');
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
