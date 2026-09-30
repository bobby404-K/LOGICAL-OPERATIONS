import { describe, it, expect } from 'vitest';
import { TseitinTransformationSolver } from '../index';

describe('Concept 013: Tseitin Transformation', () => {
  const solver = new TseitinTransformationSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('013');
    expect(solver.name).toBe('Tseitin Transformation');
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
