import { describe, it, expect } from 'vitest';
import { ProofByContrapositionSolver } from '../index';

describe('Concept 033: Proof By Contraposition', () => {
  const solver = new ProofByContrapositionSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('033');
    expect(solver.name).toBe('Proof By Contraposition');
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
