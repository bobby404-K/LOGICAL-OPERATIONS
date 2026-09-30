import { describe, it, expect } from 'vitest';
import { HypotheticalSyllogismSolver } from '../index';

describe('Concept 029: Hypothetical Syllogism', () => {
  const solver = new HypotheticalSyllogismSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('029');
    expect(solver.name).toBe('Hypothetical Syllogism');
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
