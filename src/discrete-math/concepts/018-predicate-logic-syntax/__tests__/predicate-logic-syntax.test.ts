import { describe, it, expect } from 'vitest';
import { PredicateLogicSyntaxSolver } from '../index';

describe('Concept 018: Predicate Logic Syntax', () => {
  const solver = new PredicateLogicSyntaxSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('018');
    expect(solver.name).toBe('Predicate Logic Syntax');
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
