import { describe, it, expect } from 'vitest';
import { DistributiveLawsSolver } from '../index';

describe('Concept 007: Distributive Laws', () => {
  const solver = new DistributiveLawsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('007');
    expect(solver.name).toBe('Distributive Laws');
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
