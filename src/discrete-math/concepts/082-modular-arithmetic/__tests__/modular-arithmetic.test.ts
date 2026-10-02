import { describe, it, expect } from 'vitest';
import { ModularArithmeticSolver } from '../index';

describe('Concept 082: Modular Arithmetic', () => {
  const solver = new ModularArithmeticSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('082');
    expect(solver.name).toBe('Modular Arithmetic');
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
