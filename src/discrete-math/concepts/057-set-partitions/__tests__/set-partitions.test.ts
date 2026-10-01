import { describe, it, expect } from 'vitest';
import { SetPartitionsSolver } from '../index';

describe('Concept 057: Set Partitions', () => {
  const solver = new SetPartitionsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('057');
    expect(solver.name).toBe('Set Partitions');
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
