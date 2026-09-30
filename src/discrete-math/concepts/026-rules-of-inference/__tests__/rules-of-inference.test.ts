import { describe, it, expect } from 'vitest';
import { RulesOfInferenceSolver } from '../index';

describe('Concept 026: Rules Of Inference', () => {
  const solver = new RulesOfInferenceSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('026');
    expect(solver.name).toBe('Rules Of Inference');
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
