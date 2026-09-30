import { describe, it, expect } from 'vitest';
import { HornClausesSolver } from '../index';

describe('Concept 016: Horn Clauses', () => {
  const solver = new HornClausesSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('016');
    expect(solver.name).toBe('Horn Clauses');
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
