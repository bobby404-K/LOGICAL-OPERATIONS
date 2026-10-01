import { describe, it, expect } from 'vitest';
import { PigeonholePrincipleSolver } from '../index';

describe('Concept 070: Pigeonhole Principle', () => {
  const solver = new PigeonholePrincipleSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('070');
    expect(solver.name).toBe('Pigeonhole Principle');
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
