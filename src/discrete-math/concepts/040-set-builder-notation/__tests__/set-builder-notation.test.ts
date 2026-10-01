import { describe, it, expect } from 'vitest';
import { SetBuilderNotationSolver } from '../index';

describe('Concept 040: Set Builder Notation', () => {
  const solver = new SetBuilderNotationSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('040');
    expect(solver.name).toBe('Set Builder Notation');
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
