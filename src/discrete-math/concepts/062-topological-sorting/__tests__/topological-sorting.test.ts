import { describe, it, expect } from 'vitest';
import { TopologicalSortingSolver } from '../index';

describe('Concept 062: Topological Sorting', () => {
  const solver = new TopologicalSortingSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('062');
    expect(solver.name).toBe('Topological Sorting');
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
