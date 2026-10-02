import { describe, it, expect } from 'vitest';
import { PermutationsSolver } from '../index';

describe('Concept 089: Permutations', () => {
  const solver = new PermutationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('089');
    expect(solver.name).toBe('Permutations');
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

  it('calculates permutation counts and generates all permutations', () => {
    expect(solver.count(5, 2)).toBe(20);
    expect(solver.count(4, 4)).toBe(24);
    expect(solver.count(3, 5)).toBe(0);

    const perms = solver.generatePermutations([1, 2, 3]);
    expect(perms.length).toBe(6);
    expect(perms).toContainEqual([1, 2, 3]);
    expect(perms).toContainEqual([3, 2, 1]);
  });

});
