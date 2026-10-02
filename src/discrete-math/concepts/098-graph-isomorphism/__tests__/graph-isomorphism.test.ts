import { describe, it, expect } from 'vitest';
import { GraphIsomorphismSolver } from '../index';

describe('Concept 098: Graph Isomorphism', () => {
  const solver = new GraphIsomorphismSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('098');
    expect(solver.name).toBe('Graph Isomorphism');
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

  it('detects graph isomorphism and structural invariants', () => {
    // Triangle graph K_3
    const triangle1 = [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ];
    const triangle2 = [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ];
    expect(solver.areIsomorphic(triangle1, triangle2)).toBe(true);

    // Path graph P_3 vs Triangle K_3
    const path3 = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0]
    ];
    expect(solver.areIsomorphic(triangle1, path3)).toBe(false);
  });

});
