import { describe, it, expect } from 'vitest';
import { ModusPonensSolver } from '../index';

describe('Concept 027: Modus Ponens', () => {
  const solver = new ModusPonensSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('027');
    expect(solver.name).toBe('Modus Ponens');
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
