import { describe, it, expect } from 'vitest';
import { DisjunctiveNormalFormSolver } from '../index';

describe('Concept 011: Disjunctive Normal Form', () => {
  const solver = new DisjunctiveNormalFormSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('011');
    expect(solver.name).toBe('Disjunctive Normal Form');
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
