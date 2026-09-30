import { describe, it, expect } from 'vitest';
import { PrenexNormalFormSolver } from '../index';

describe('Concept 023: Prenex Normal Form', () => {
  const solver = new PrenexNormalFormSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('023');
    expect(solver.name).toBe('Prenex Normal Form');
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
