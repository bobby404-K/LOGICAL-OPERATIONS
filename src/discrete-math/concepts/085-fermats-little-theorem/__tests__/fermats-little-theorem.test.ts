import { describe, it, expect } from 'vitest';
import { FermatsLittleTheoremSolver } from '../index';

describe('Concept 085: Fermats Little Theorem', () => {
  const solver = new FermatsLittleTheoremSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('085');
    expect(solver.name).toBe('Fermats Little Theorem');
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

  it('verifies Fermat Little Theorem identity', () => {
    expect(solver.verifyTheorem(2, 7)).toBe(true); // 2^6 = 64 = 1 mod 7
    expect(solver.verifyTheorem(3, 11)).toBe(true); // 3^10 = 1 mod 11
    expect(solver.verifyTheorem(4, 13)).toBe(true);
  });

  it('computes modular inverse using Fermat power a^(p-2) mod p', () => {
    expect(solver.computeInversePrimeModulus(3, 11)).toBe(4);
    expect(solver.computeInversePrimeModulus(2, 7)).toBe(4);
  });

});
