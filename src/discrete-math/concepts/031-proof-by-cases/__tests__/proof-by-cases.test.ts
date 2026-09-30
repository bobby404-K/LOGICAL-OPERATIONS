import { describe, it, expect } from 'vitest';
import { ProofByCasesSolver } from '../index';

describe('Concept 031: Proof By Cases', () => {
  const solver = new ProofByCasesSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('031');
    expect(solver.name).toBe('Proof By Cases');
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
