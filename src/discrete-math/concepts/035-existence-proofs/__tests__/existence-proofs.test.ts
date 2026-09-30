import { describe, it, expect } from 'vitest';
import { ExistenceProofsSolver } from '../index';

describe('Concept 035: Existence Proofs', () => {
  const solver = new ExistenceProofsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('035');
    expect(solver.name).toBe('Existence Proofs');
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
