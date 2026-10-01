import { describe, it, expect } from 'vitest';
import { BijectiveFunctionsSolver } from '../index';

describe('Concept 066: Bijective Functions', () => {
  const solver = new BijectiveFunctionsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('066');
    expect(solver.name).toBe('Bijective Functions');
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
