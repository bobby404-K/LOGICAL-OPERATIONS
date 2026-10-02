import { describe, it, expect } from 'vitest';
import { CombinationsSolver } from '../index';

describe('Concept 090: Combinations', () => {
  const solver = new CombinationsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('090');
    expect(solver.name).toBe('Combinations');
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

  it('calculates combination counts and generates subsets', () => {
    expect(solver.count(5, 2)).toBe(10);
    expect(solver.count(6, 3)).toBe(20);
    expect(solver.combinationsWithRepetition(3, 2)).toBe(6); // C(3+2-1, 2) = C(4, 2) = 6

    const combos = solver.generateCombinations(['a', 'b', 'c'], 2);
    expect(combos.length).toBe(3);
    expect(combos).toEqual([['a', 'b'], ['a', 'c'], ['b', 'c']]);
  });

});
