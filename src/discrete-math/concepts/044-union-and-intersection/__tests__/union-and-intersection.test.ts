import { describe, it, expect } from 'vitest';
import { UnionAndIntersectionSolver } from '../index';

describe('Concept 044: Union And Intersection', () => {
  const solver = new UnionAndIntersectionSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('044');
    expect(solver.name).toBe('Union And Intersection');
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
