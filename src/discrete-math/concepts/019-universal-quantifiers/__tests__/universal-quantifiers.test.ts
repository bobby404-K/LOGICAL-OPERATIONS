import { describe, it, expect } from 'vitest';
import { UniversalQuantifiersSolver } from '../index';

describe('Concept 019: Universal Quantifiers', () => {
  const solver = new UniversalQuantifiersSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('019');
    expect(solver.name).toBe('Universal Quantifiers');
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
