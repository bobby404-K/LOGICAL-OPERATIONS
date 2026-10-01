import { describe, it, expect } from 'vitest';
import { InjectiveFunctionsSolver } from '../index';

describe('Concept 064: Injective Functions', () => {
  const solver = new InjectiveFunctionsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('064');
    expect(solver.name).toBe('Injective Functions');
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
