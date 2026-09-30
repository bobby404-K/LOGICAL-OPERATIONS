import { describe, it, expect } from 'vitest';
import { ExistentialQuantifiersSolver } from '../index';

describe('Concept 020: Existential Quantifiers', () => {
  const solver = new ExistentialQuantifiersSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('020');
    expect(solver.name).toBe('Existential Quantifiers');
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
