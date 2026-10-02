import { describe, it, expect } from 'vitest';
import { RuleOfSumAndProductSolver } from '../index';

describe('Concept 088: Rule Of Sum And Product', () => {
  const solver = new RuleOfSumAndProductSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('088');
    expect(solver.name).toBe('Rule Of Sum And Product');
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

  it('calculates sum and product rule configurations accurately', () => {
    expect(solver.sumRule([3, 5, 7])).toBe(15);
    expect(solver.productRule([3, 5, 2])).toBe(30);

    const cp = solver.cartesianProduct([1, 2], ['a', 'b', 'c']);
    expect(cp.length).toBe(6);
    expect(cp[0]).toEqual([1, 'a']);
  });

});
