import { describe, it, expect } from 'vitest';
import { DisjunctiveSyllogismSolver } from '../index';

describe('Concept 030: Disjunctive Syllogism', () => {
  const solver = new DisjunctiveSyllogismSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('030');
    expect(solver.name).toBe('Disjunctive Syllogism');
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
