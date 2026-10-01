import { describe, it, expect } from 'vitest';
import { InverseFunctionsSolver } from '../index';

describe('Concept 067: Inverse Functions', () => {
  const solver = new InverseFunctionsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('067');
    expect(solver.name).toBe('Inverse Functions');
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
