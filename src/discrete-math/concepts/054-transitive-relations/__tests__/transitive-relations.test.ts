import { describe, it, expect } from 'vitest';
import { TransitiveRelationsSolver } from '../index';

describe('Concept 054: Transitive Relations', () => {
  const solver = new TransitiveRelationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('054');
    expect(solver.name).toBe('Transitive Relations');
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
