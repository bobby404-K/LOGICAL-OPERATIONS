import { describe, it, expect } from 'vitest';
import { ContrapositiveAndConverseSolver } from '../index';

describe('Concept 009: Contrapositive And Converse', () => {
  const solver = new ContrapositiveAndConverseSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('009');
    expect(solver.name).toBe('Contrapositive And Converse');
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
