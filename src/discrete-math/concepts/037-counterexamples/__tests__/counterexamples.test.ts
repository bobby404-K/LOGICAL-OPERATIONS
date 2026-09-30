import { describe, it, expect } from 'vitest';
import { CounterexamplesSolver } from '../index';

describe('Concept 037: Counterexamples', () => {
  const solver = new CounterexamplesSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('037');
    expect(solver.name).toBe('Counterexamples');
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
