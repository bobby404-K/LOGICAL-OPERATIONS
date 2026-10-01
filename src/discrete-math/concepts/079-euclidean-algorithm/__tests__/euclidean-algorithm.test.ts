import { describe, it, expect } from 'vitest';
import { EuclideanAlgorithmSolver } from '../index';

describe('Concept 079: Euclidean Algorithm', () => {
  const solver = new EuclideanAlgorithmSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('079');
    expect(solver.name).toBe('Euclidean Algorithm');
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
