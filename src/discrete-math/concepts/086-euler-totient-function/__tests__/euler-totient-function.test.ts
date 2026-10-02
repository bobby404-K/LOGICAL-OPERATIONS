import { describe, it, expect } from 'vitest';
import { EulerTotientFunctionSolver } from '../index';

describe('Concept 086: Euler Totient Function', () => {
  const solver = new EulerTotientFunctionSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('086');
    expect(solver.name).toBe('Euler Totient Function');
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

  it('correctly calculates Euler totient phi(n)', () => {
    expect(solver.totient(1)).toBe(1);
    expect(solver.totient(7)).toBe(6); // prime
    expect(solver.totient(12)).toBe(4); // 1, 5, 7, 11
    expect(solver.totient(36)).toBe(12);
  });

  it('matches totient list generation', () => {
    const coprimes12 = solver.getRelativelyPrimeNumbers(12);
    expect(coprimes12).toEqual([1, 5, 7, 11]);
    expect(coprimes12.length).toBe(solver.totient(12));
  });

});
