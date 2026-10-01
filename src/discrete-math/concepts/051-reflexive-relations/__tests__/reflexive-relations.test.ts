import { describe, it, expect } from 'vitest';
import { ReflexiveRelationsSolver } from '../index';

describe('Concept 051: Reflexive Relations', () => {
  const solver = new ReflexiveRelationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('051');
    expect(solver.name).toBe('Reflexive Relations');
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
