import { describe, it, expect } from 'vitest';
import { ChineseRemainderTheoremSolver } from '../index';

describe('Concept 084: Chinese Remainder Theorem', () => {
  const solver = new ChineseRemainderTheoremSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('084');
    expect(solver.name).toBe('Chinese Remainder Theorem');
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

  it('solves standard systems of congruences via CRT', () => {
    // x = 2 mod 3, x = 3 mod 5, x = 2 mod 7 -> x = 23 mod 105
    const res = solver.solveCRT([
      { remainder: 2, modulus: 3 },
      { remainder: 3, modulus: 5 },
      { remainder: 2, modulus: 7 }
    ]);
    expect(res).not.toBeNull();
    expect(res?.solution).toBe(23);
    expect(res?.modulus).toBe(105);
  });

  it('rejects non-coprime moduli systems', () => {
    const res = solver.solveCRT([
      { remainder: 1, modulus: 4 },
      { remainder: 2, modulus: 6 }
    ]);
    expect(res).toBeNull();
  });

});
