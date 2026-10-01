import { describe, it, expect } from 'vitest';
import { BinaryRelationsSolver } from '../index';

describe('Concept 050: Binary Relations', () => {
  const solver = new BinaryRelationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('050');
    expect(solver.name).toBe('Binary Relations');
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
