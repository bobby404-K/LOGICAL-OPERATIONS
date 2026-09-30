import { describe, it, expect } from 'vitest';
import { SkolemizationSolver } from '../index';

describe('Concept 024: Skolemization', () => {
  const solver = new SkolemizationSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('024');
    expect(solver.name).toBe('Skolemization');
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
