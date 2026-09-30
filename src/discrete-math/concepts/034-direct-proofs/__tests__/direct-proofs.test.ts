import { describe, it, expect } from 'vitest';
import { DirectProofsSolver } from '../index';

describe('Concept 034: Direct Proofs', () => {
  const solver = new DirectProofsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('034');
    expect(solver.name).toBe('Direct Proofs');
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
