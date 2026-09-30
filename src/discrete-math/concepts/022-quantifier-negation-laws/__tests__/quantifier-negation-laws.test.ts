import { describe, it, expect } from 'vitest';
import { QuantifierNegationLawsSolver } from '../index';

describe('Concept 022: Quantifier Negation Laws', () => {
  const solver = new QuantifierNegationLawsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('022');
    expect(solver.name).toBe('Quantifier Negation Laws');
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
