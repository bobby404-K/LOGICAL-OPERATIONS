import { describe, it, expect } from 'vitest';
import { DerangementsSolver } from '../index';

describe('Concept 095: Derangements', () => {
  const solver = new DerangementsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('095');
    expect(solver.name).toBe('Derangements');
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

  it('accurately counts and generates derangements', () => {
    expect(solver.count(0)).toBe(1);
    expect(solver.count(1)).toBe(0);
    expect(solver.count(2)).toBe(1);
    expect(solver.count(3)).toBe(2);
    expect(solver.count(4)).toBe(9);
    expect(solver.count(5)).toBe(44);

    const d3 = solver.generateDerangements(3);
    expect(d3.length).toBe(2);
    expect(d3).toEqual([[2, 3, 1], [3, 1, 2]]);
    for (const p of d3) {
      expect(solver.isDerangement([1, 2, 3], p)).toBe(true);
    }
  });

});
