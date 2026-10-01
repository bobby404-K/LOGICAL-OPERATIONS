import { describe, it, expect } from 'vitest';
import { SubsetRelationsSolver } from '../index';

describe('Concept 041: Subset Relations', () => {
  const solver = new SubsetRelationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('041');
    expect(solver.name).toBe('Subset Relations');
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
