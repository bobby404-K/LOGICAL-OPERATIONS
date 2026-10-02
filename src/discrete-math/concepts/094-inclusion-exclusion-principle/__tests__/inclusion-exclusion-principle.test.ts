import { describe, it, expect } from 'vitest';
import { InclusionExclusionPrincipleSolver } from '../index';

describe('Concept 094: Inclusion Exclusion Principle', () => {
  const solver = new InclusionExclusionPrincipleSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('094');
    expect(solver.name).toBe('Inclusion Exclusion Principle');
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

  it('computes 2-set and 3-set PIE unions and surjective function counts', () => {
    expect(solver.unionSize2(10, 15, 4)).toBe(21);
    expect(solver.unionSize3(10, 10, 10, 3, 3, 3, 1)).toBe(22);

    const actualUnion = solver.computeSetUnionSize([[1, 2, 3], [3, 4], [4, 5, 1]]);
    expect(actualUnion).toBe(5);

    // Onto functions from size 3 to size 2: 2^3 - 2 = 6
    expect(solver.countOntoFunctions(3, 2)).toBe(6);
  });

});
