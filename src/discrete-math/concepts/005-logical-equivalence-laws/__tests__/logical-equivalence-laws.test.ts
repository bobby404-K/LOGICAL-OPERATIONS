import { describe, it, expect } from 'vitest';
import {
  areLogicallyEquivalent,
  verifyCatalogLaw,
  verifyProofChain,
  LOGIC_LAWS
} from '../index';

describe('Concept 005: Logical Equivalence Laws', () => {
  describe('areLogicallyEquivalent', () => {
    it('verifies fundamental laws', () => {
      // Double negation
      expect(areLogicallyEquivalent('¬¬p', 'p').isEquivalent).toBe(true);

      // De Morgan's
      expect(areLogicallyEquivalent('¬(p ∧ q)', '¬p ∨ ¬q').isEquivalent).toBe(true);
      expect(areLogicallyEquivalent('¬(p ∨ q)', '¬p ∧ ¬q').isEquivalent).toBe(true);

      // Material implication
      expect(areLogicallyEquivalent('p → q', '¬p ∨ q').isEquivalent).toBe(true);

      // Contraposition
      expect(areLogicallyEquivalent('p → q', '¬q → ¬p').isEquivalent).toBe(true);
    });

    it('identifies non-equivalent expressions with a counterexample', () => {
      const res = areLogicallyEquivalent('p → q', 'q → p'); // Converse fallacy
      expect(res.isEquivalent).toBe(false);
      expect(res.counterexample).toBeDefined();

      // For converse, in lexicographical descending row order (Row 1: p=true, q=false), p->q is false while q->p is true
      const { counterexample } = res;
      expect(counterexample).toEqual({ p: true, q: false });
    });
  });

  describe('verifyCatalogLaw', () => {
    it('verifies all laws in the catalog', () => {
      for (const law of LOGIC_LAWS) {
        const check = verifyCatalogLaw(law.id);
        expect(check.valid).toBe(true);
      }
    });
  });

  describe('verifyProofChain', () => {
    it('validates a valid step-by-step algebraic derivation', () => {
      // Proving: ¬(p → q) ≡ p ∧ ¬q
      const chain = [
        '¬(p → q)',
        '¬(¬p ∨ q)',  // Material implication
        '¬¬p ∧ ¬q',   // De Morgan
        'p ∧ ¬q'      // Double negation
      ];

      const res = verifyProofChain(chain);
      expect(res.isValid).toBe(true);
      expect(res.totalSteps).toBe(3);
    });

    it('rejects an invalid derivation step with the exact failure point', () => {
      const faultyChain = [
        '¬(p → q)',
        '¬(¬p ∧ q)', // Faulty step! Should be ∨
        'p ∨ ¬q'
      ];

      const res = verifyProofChain(faultyChain);
      expect(res.isValid).toBe(false);
      expect(res.failedStepIndex).toBe(1);
      expect(res.error).toContain('Invalid equivalence step 1');
    });
  });
});
