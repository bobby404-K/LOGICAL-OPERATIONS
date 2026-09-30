import { describe, it, expect } from 'vitest';
import { ConjunctiveNormalFormSolver } from '../index';

describe('Concept 012: Conjunctive Normal Form', () => {
  const solver = new ConjunctiveNormalFormSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('012');
    expect(solver.name).toBe('Conjunctive Normal Form');
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
