import { describe, it, expect } from 'vitest';
import { UniquenessProofsSolver } from '../index';

describe('Concept 036: Uniqueness Proofs', () => {
  const solver = new UniquenessProofsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('036');
    expect(solver.name).toBe('Uniqueness Proofs');
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
