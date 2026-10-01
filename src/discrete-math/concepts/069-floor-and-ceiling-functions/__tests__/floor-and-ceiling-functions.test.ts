import { describe, it, expect } from 'vitest';
import { FloorAndCeilingFunctionsSolver } from '../index';

describe('Concept 069: Floor And Ceiling Functions', () => {
  const solver = new FloorAndCeilingFunctionsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('069');
    expect(solver.name).toBe('Floor And Ceiling Functions');
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
