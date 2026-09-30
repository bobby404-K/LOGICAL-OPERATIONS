import { describe, it, expect } from 'vitest';
import { ResolutionPrincipleSolver } from '../index';

describe('Concept 017: Resolution Principle', () => {
  const solver = new ResolutionPrincipleSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('017');
    expect(solver.name).toBe('Resolution Principle');
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
