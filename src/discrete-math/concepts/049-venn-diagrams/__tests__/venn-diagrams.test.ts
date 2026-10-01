import { describe, it, expect } from 'vitest';
import { VennDiagramsSolver } from '../index';

describe('Concept 049: Venn Diagrams', () => {
  const solver = new VennDiagramsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('049');
    expect(solver.name).toBe('Venn Diagrams');
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
