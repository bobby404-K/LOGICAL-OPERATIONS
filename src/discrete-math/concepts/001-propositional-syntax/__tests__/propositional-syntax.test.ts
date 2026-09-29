import { describe, it, expect } from 'vitest';
import {
  validateWff,
  checkBalancedParentheses,
  getOperatorPrecedence,
  calculateFormulaDepth,
  countConnectives,
  toFullyParenthesized
} from '../index';

describe('Concept 001: Propositional Syntax', () => {
  describe('checkBalancedParentheses', () => {
    it('accepts balanced expressions', () => {
      expect(checkBalancedParentheses('(p ∧ q)').balanced).toBe(true);
      expect(checkBalancedParentheses('((p ∨ q) → (r ∧ ¬s))').balanced).toBe(true);
      expect(checkBalancedParentheses('p').balanced).toBe(true);
    });

    it('rejects unclosed or misplaced parentheses', () => {
      expect(checkBalancedParentheses('(p ∧ q').balanced).toBe(false);
      expect(checkBalancedParentheses('p ∧ q)').balanced).toBe(false);
      expect(checkBalancedParentheses(')(p ∧ q)(').balanced).toBe(false);
    });
  });

  describe('validateWff', () => {
    it('validates primitive atomic variables', () => {
      const res = validateWff('p');
      expect(res.isValid).toBe(true);
      expect(res.variables).toEqual(['p']);
      expect(res.depth).toBe(0);
      expect(res.connectiveCount?.total).toBe(0);
    });

    it('validates negation and binary formulas', () => {
      const res = validateWff('¬(p ∧ q) → (r ∨ ¬s)');
      expect(res.isValid).toBe(true);
      expect(res.variables).toEqual(['p', 'q', 'r', 's']);
      expect(res.connectiveCount?.unary).toBe(2); // two NOTs
      expect(res.connectiveCount?.binary).toBe(3); // AND, OR, IMPLIES
      expect(res.connectiveCount?.total).toBe(5);
    });

    it('identifies syntax errors for ill-formed formulas', () => {
      expect(validateWff('p ∧ ∧ q').isValid).toBe(false);
      expect(validateWff('∧ p').isValid).toBe(false);
      expect(validateWff('p →').isValid).toBe(false);
      expect(validateWff('').isValid).toBe(false);
    });
  });

  describe('AST metrics & formatting', () => {
    it('counts connectives directly', () => {
      const res = validateWff('p ∧ q → ¬r');
      const counts = countConnectives(res.ast!);
      expect(counts.total).toBe(3);
      expect(counts.unary).toBe(1);
      expect(counts.binary).toBe(2);
    });

    it('computes correct formula depth', () => {
      const res1 = validateWff('p');
      expect(calculateFormulaDepth(res1.ast!)).toBe(0);

      const res2 = validateWff('¬p');
      expect(calculateFormulaDepth(res2.ast!)).toBe(1);

      const res3 = validateWff('p ∧ q');
      expect(calculateFormulaDepth(res3.ast!)).toBe(1);

      const res4 = validateWff('(p ∧ q) ∨ (r ∧ s)');
      expect(calculateFormulaDepth(res4.ast!)).toBe(2);
    });

    it('produces fully parenthesized string representation', () => {
      const res = validateWff('p ∧ q ∨ r');
      expect(res.isValid).toBe(true);
      expect(toFullyParenthesized(res.ast!)).toBe('((p ∧ q) ∨ r)');
    });

    it('enforces operator precedence correctly', () => {
      expect(getOperatorPrecedence('NOT')).toBeGreaterThan(getOperatorPrecedence('AND'));
      expect(getOperatorPrecedence('AND')).toBeGreaterThan(getOperatorPrecedence('OR'));
      expect(getOperatorPrecedence('OR')).toBeGreaterThan(getOperatorPrecedence('IMPLIES'));
      expect(getOperatorPrecedence('IMPLIES')).toBeGreaterThan(getOperatorPrecedence('IFF'));
    });
  });
});
