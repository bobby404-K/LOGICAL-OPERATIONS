import { describe, it, expect } from 'vitest';
import { EquivalenceRelationsSolver } from '../index';

describe('Concept 055: Equivalence Relations', () => {
  const solver = new EquivalenceRelationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('055');
    expect(solver.name).toBe('Equivalence Relations');
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
