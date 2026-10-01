import { describe, it, expect } from 'vitest';
import { TotalOrderingsSolver } from '../index';

describe('Concept 060: Total Orderings', () => {
  const solver = new TotalOrderingsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('060');
    expect(solver.name).toBe('Total Orderings');
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
