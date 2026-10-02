import { describe, it, expect } from 'vitest';
import { EulerianAndHamiltonianGraphsSolver } from '../index';

describe('Concept 099: Eulerian And Hamiltonian Graphs', () => {
  const solver = new EulerianAndHamiltonianGraphsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('099');
    expect(solver.name).toBe('Eulerian And Hamiltonian Graphs');
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

  it('correctly classifies Eulerian and Hamiltonian graphs', () => {
    // 4-cycle C_4: Eulerian circuit (all degree 2) & Hamiltonian cycle
    const c4 = [
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [1, 0, 1, 0]
    ];
    const eulerRes = solver.isEulerian(c4);
    expect(eulerRes.hasCircuit).toBe(true);
    expect(eulerRes.hasTrail).toBe(true);
    expect(solver.hasHamiltonianCycle(c4)).toBe(true);

    // K_4 complete graph satisfies Dirac condition
    const k4 = [
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 0, 1],
      [1, 1, 1, 0]
    ];
    expect(solver.checkDiracCondition(k4)).toBe(true);
    expect(solver.hasHamiltonianCycle(k4)).toBe(true);
  });

});
