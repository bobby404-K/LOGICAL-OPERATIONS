import { describe, it, expect } from 'vitest';
import {
  classifyFormula,
  isTautology,
  isContradiction,
  isSatisfiable,
  isContingency,
  findSatisfyingModel,
  findCounterexample
} from '../index';

describe('Concept 004: Tautologies, Contradictions, and Contingencies', () => {
  describe('Tautology Verification', () => {
    it('identifies classic tautologies', () => {
      expect(isTautology('p ∨ ¬p')).toBe(true); // Law of Excluded Middle
      expect(isTautology('p → p')).toBe(true); // Self-implication
      expect(isTautology('¬(p ∧ q) ↔ (¬p ∨ ¬q)')).toBe(true); // De Morgan
      expect(isTautology('(p ∧ (p → q)) → q')).toBe(true); // Modus Ponens
    });

    it('has satisfaction density of 1.0 and zero counterexamples for tautology', () => {
      const res = classifyFormula('p ∨ ¬p');
      expect(res.classification).toBe('TAUTOLOGY');
      expect(res.satisfactionDensity).toBe(1.0);
      expect(res.counterexamples).toHaveLength(0);
      expect(res.satisfyingCount).toBe(res.totalValuations);
    });
  });

  describe('Contradiction Verification', () => {
    it('identifies classic contradictions', () => {
      expect(isContradiction('p ∧ ¬p')).toBe(true);
      expect(isContradiction('p ↔ ¬p')).toBe(true);
      expect(isContradiction('(p → q) ∧ p ∧ ¬q')).toBe(true);
    });

    it('has satisfaction density of 0.0 and zero satisfying models for contradiction', () => {
      const res = classifyFormula('p ∧ ¬p');
      expect(res.classification).toBe('CONTRADICTION');
      expect(res.satisfactionDensity).toBe(0.0);
      expect(res.satisfyingModels).toHaveLength(0);
      expect(findSatisfyingModel('p ∧ ¬p')).toBeNull();
      expect(findCounterexample('p ∧ ¬p')).not.toBeNull();
    });
  });

  describe('Contingency Verification', () => {
    it('identifies contingent formulas', () => {
      expect(isContingency('p ∧ q')).toBe(true);
      expect(isContingency('p ∨ q')).toBe(true);
      expect(isContingency('p → q')).toBe(true);
    });

    it('has fractional satisfaction density for contingencies', () => {
      const res = classifyFormula('p ∧ q');
      expect(res.classification).toBe('CONTINGENCY');
      expect(res.satisfyingCount).toBe(1);
      expect(res.falsifyingCount).toBe(3);
      expect(res.satisfactionDensity).toBe(0.25);
      expect(res.satisfyingModels).toEqual([{ p: true, q: true }]);
    });

    it('satisfiability tests', () => {
      expect(isSatisfiable('p ∧ q')).toBe(true); // contingency is SAT
      expect(isSatisfiable('p ∨ ¬p')).toBe(true); // tautology is SAT
      expect(isSatisfiable('p ∧ ¬p')).toBe(false); // contradiction is UNSAT
    });
  });
});
