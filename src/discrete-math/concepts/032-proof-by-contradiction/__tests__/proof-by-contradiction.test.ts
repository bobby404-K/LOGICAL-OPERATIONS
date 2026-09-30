import { describe, it, expect } from 'vitest';
import { ProofByContradictionSolver } from '../index';

describe('Concept 032: Proof By Contradiction', () => {
  const solver = new ProofByContradictionSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('032');
    expect(solver.name).toBe('Proof By Contradiction');
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
