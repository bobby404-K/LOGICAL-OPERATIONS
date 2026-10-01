import { describe, it, expect } from 'vitest';
import { NaiveSetTheorySolver } from '../index';

describe('Concept 038: Naive Set Theory', () => {
  const solver = new NaiveSetTheorySolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('038');
    expect(solver.name).toBe('Naive Set Theory');
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
