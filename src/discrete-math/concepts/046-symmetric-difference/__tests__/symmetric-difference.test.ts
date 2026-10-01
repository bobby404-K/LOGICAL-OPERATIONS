import { describe, it, expect } from 'vitest';
import { SymmetricDifferenceSolver } from '../index';

describe('Concept 046: Symmetric Difference', () => {
  const solver = new SymmetricDifferenceSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('046');
    expect(solver.name).toBe('Symmetric Difference');
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
