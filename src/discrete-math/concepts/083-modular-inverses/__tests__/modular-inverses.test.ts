import { describe, it, expect } from 'vitest';
import { ModularInversesSolver } from '../index';

describe('Concept 083: Modular Inverses', () => {
  const solver = new ModularInversesSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('083');
    expect(solver.name).toBe('Modular Inverses');
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

  it('computes modular inverse correctly using Extended Euclidean Algorithm', () => {
    expect(solver.computeInverse(3, 11)).toBe(4); // 3 * 4 = 12 = 1 mod 11
    expect(solver.computeInverse(10, 17)).toBe(12); // 10 * 12 = 120 = 7*17 + 1 = 1 mod 17
    expect(solver.computeInverse(6, 9)).toBeNull(); // gcd(6, 9) = 3 != 1
  });

  it('solves linear congruences correctly', () => {
    const sols = solver.solveCongruence(2, 4, 6); // gcd(2, 6) = 2 -> 2 solutions
    expect(sols).toEqual([2, 5]);
  });

});
