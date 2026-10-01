import { describe, it, expect } from 'vitest';
import { CartesianProductsSolver } from '../index';

describe('Concept 043: Cartesian Products', () => {
  const solver = new CartesianProductsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('043');
    expect(solver.name).toBe('Cartesian Products');
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
