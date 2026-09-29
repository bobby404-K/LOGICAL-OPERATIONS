import { describe, it, expect } from 'vitest';
import { DemorganLawsSolver } from '../index';

describe('Concept 006: Demorgan Laws', () => {
  const solver = new DemorganLawsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('006');
    expect(solver.name).toBe('Demorgan Laws');
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
