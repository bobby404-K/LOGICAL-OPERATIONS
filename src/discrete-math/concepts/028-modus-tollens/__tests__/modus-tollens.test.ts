import { describe, it, expect } from 'vitest';
import { ModusTollensSolver } from '../index';

describe('Concept 028: Modus Tollens', () => {
  const solver = new ModusTollensSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('028');
    expect(solver.name).toBe('Modus Tollens');
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
