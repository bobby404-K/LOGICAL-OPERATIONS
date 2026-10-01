import { describe, it, expect } from 'vitest';
import { HasseDiagramsSolver } from '../index';

describe('Concept 059: Hasse Diagrams', () => {
  const solver = new HasseDiagramsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('059');
    expect(solver.name).toBe('Hasse Diagrams');
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
