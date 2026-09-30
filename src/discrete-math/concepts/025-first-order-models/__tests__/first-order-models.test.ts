import { describe, it, expect } from 'vitest';
import { FirstOrderModelsSolver } from '../index';

describe('Concept 025: First Order Models', () => {
  const solver = new FirstOrderModelsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('025');
    expect(solver.name).toBe('First Order Models');
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
