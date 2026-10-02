import { describe, it, expect } from 'vitest';
import { TuringMachinesAndComplexitySolver } from '../index';

describe('Concept 100: Turing Machines And Complexity', () => {
  const solver = new TuringMachinesAndComplexitySolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('100');
    expect(solver.name).toBe('Turing Machines And Complexity');
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

  it('simulates a deterministic Turing Machine binary incrementer', () => {
    solver.setupBinaryIncrementer();

    // Increment '101' (5) -> '110' (6)
    const res1 = solver.simulate(['1', '0', '1']);
    expect(res1.accepted).toBe(true);
    expect(res1.finalTape.slice(0, 3)).toEqual(['1', '1', '0']);

    // Increment '11' (3) -> '100' (4) with carry
    const res2 = solver.simulate(['1', '1']);
    expect(res2.accepted).toBe(true);
    expect(res2.finalTape.slice(0, 3)).toEqual(['1', '0', '0']);
  });

});
