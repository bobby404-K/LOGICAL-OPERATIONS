import { describe, it, expect } from 'vitest';
import { GeneralizedPigeonholePrincipleSolver } from '../index';

describe('Concept 071: Generalized Pigeonhole Principle', () => {
  const solver = new GeneralizedPigeonholePrincipleSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('071');
    expect(solver.name).toBe('Generalized Pigeonhole Principle');
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
