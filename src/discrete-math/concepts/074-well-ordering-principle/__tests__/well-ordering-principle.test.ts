import { describe, it, expect } from 'vitest';
import { WellOrderingPrincipleSolver } from '../index';

describe('Concept 074: Well Ordering Principle', () => {
  const solver = new WellOrderingPrincipleSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('074');
    expect(solver.name).toBe('Well Ordering Principle');
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
