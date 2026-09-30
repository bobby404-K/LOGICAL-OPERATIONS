import { describe, it, expect } from 'vitest';
import { BooleanSatisfiabilitySatSolver } from '../index';

describe('Concept 014: Boolean Satisfiability Sat', () => {
  const solver = new BooleanSatisfiabilitySatSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('014');
    expect(solver.name).toBe('Boolean Satisfiability Sat');
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
