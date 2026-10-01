import { describe, it, expect } from 'vitest';
import { SetDifferenceSolver } from '../index';

describe('Concept 045: Set Difference', () => {
  const solver = new SetDifferenceSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('045');
    expect(solver.name).toBe('Set Difference');
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
