import { describe, it, expect } from 'vitest';
import { BinomialTheoremSolver } from '../index';

describe('Concept 092: Binomial Theorem', () => {
  const solver = new BinomialTheoremSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('092');
    expect(solver.name).toBe('Binomial Theorem');
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

  it('generates binomial coefficients and expansion formatting', () => {
    expect(solver.expandCoefficients(3)).toEqual([1, 3, 3, 1]);
    expect(solver.expandCoefficients(4)).toEqual([1, 4, 6, 4, 1]);
    expect(solver.evaluatePolynomial(3, 2, 3)).toBe(125); // (2+3)^3 = 125
    expect(solver.formatExpansion(2)).toBe('x^2 + 2xy + y^2');
  });

});
