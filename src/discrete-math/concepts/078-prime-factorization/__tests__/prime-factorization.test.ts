import { describe, it, expect } from 'vitest';
import { PrimeFactorizationSolver } from '../index';

describe('Concept 078: Prime Factorization', () => {
  const solver = new PrimeFactorizationSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('078');
    expect(solver.name).toBe('Prime Factorization');
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
