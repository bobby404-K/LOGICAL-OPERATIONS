import { describe, it, expect } from 'vitest';
import { RecurrenceRelationsSolver } from '../index';

describe('Concept 096: Recurrence Relations', () => {
  const solver = new RecurrenceRelationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('096');
    expect(solver.name).toBe('Recurrence Relations');
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

  it('evaluates linear recurrence sequences and characteristic roots', () => {
    // Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13
    expect(solver.fibonacci(0)).toBe(0);
    expect(solver.fibonacci(1)).toBe(1);
    expect(solver.fibonacci(7)).toBe(13);

    // Tribonacci: a_n = a_{n-1} + a_{n-2} + a_{n-3} with [0, 0, 1]
    const trib7 = solver.evaluateLinearRecurrence([1, 1, 1], [0, 0, 1], 6);
    expect(trib7).toBe(7); // 0, 0, 1, 1, 2, 4, 7

    const roots = solver.solveCharacteristicRootsDegree2(5, -6); // r^2 - 5r + 6 = 0 -> (r-3)(r-2)=0
    expect(roots.r1).toBe(3);
    expect(roots.r2).toBe(2);
    expect(roots.type).toBe('distinct');
  });

});
