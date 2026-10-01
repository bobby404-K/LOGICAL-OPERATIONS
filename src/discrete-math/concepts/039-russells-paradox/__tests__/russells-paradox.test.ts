import { describe, it, expect } from 'vitest';
import { RussellsParadoxSolver } from '../index';

describe('Concept 039: Russells Paradox', () => {
  const solver = new RussellsParadoxSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('039');
    expect(solver.name).toBe('Russells Paradox');
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
