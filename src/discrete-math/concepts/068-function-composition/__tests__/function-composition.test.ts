import { describe, it, expect } from 'vitest';
import { FunctionCompositionSolver } from '../index';

describe('Concept 068: Function Composition', () => {
  const solver = new FunctionCompositionSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('068');
    expect(solver.name).toBe('Function Composition');
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
