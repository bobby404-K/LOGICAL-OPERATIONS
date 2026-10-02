import { describe, it, expect } from 'vitest';
import { GeneratingFunctionsSolver } from '../index';

describe('Concept 097: Generating Functions', () => {
  const solver = new GeneratingFunctionsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('097');
    expect(solver.name).toBe('Generating Functions');
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

  it('performs polynomial convolution and coefficient expansion for generating functions', () => {
    // (1 + x) * (1 + x) = 1 + 2x + x^2
    const sq = solver.multiplyPolynomials([1, 1], [1, 1]);
    expect(sq).toEqual([1, 2, 1]);

    // (1 + x + x^2) + (2 - x) = 3 + x^2
    const sum = solver.addPolynomials([1, 1, 1], [2, -1]);
    expect(sum).toEqual([3, 0, 1]);

    expect(solver.evaluatePolynomial([1, 2, 1], 3)).toBe(16); // (1+3)^2 = 16
    expect(solver.geometricSeriesCoefficients(2, 4)).toEqual([1, 2, 4, 8]);
  });

});
