import { describe, it, expect } from 'vitest';
import { WellOrderedSetsSolver } from '../index';

describe('Concept 061: Well Ordered Sets', () => {
  const solver = new WellOrderedSetsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('061');
    expect(solver.name).toBe('Well Ordered Sets');
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
