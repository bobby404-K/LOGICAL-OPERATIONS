import { describe, it, expect } from 'vitest';
import { FunctionsAndMappingsSolver } from '../index';

describe('Concept 063: Functions And Mappings', () => {
  const solver = new FunctionsAndMappingsSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('063');
    expect(solver.name).toBe('Functions And Mappings');
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
