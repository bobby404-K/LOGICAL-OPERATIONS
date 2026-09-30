import { describe, it, expect } from 'vitest';
import { ConditionalStatementsSolver } from '../index';

describe('Concept 008: Conditional Statements', () => {
  const solver = new ConditionalStatementsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('008');
    expect(solver.name).toBe('Conditional Statements');
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
