import { describe, it, expect } from 'vitest';
import {
  TruthFunctions,
  evaluateConnective,
  getConnectiveProperties,
  getOperatorTruthTable,
  isFunctionallyComplete
} from '../index';

describe('Concept 002: Truth-Functional Connectives', () => {
  describe('Truth functions evaluation', () => {
    it('evaluates connectives via dispatch function', () => {
      expect(evaluateConnective('AND', true, false)).toBe(false);
      expect(evaluateConnective('IMPLIES', false, false)).toBe(true);
      expect(evaluateConnective('NOT', true)).toBe(false);
    });

    it('evaluates Negation correctly', () => {
      expect(TruthFunctions.not(true)).toBe(false);
      expect(TruthFunctions.not(false)).toBe(true);
    });

    it('evaluates Conjunction and Disjunction', () => {
      expect(TruthFunctions.and(true, true)).toBe(true);
      expect(TruthFunctions.and(true, false)).toBe(false);

      expect(TruthFunctions.or(false, false)).toBe(false);
      expect(TruthFunctions.or(true, false)).toBe(true);
    });

    it('evaluates Material Implication correctly (false only when T -> F)', () => {
      expect(TruthFunctions.implies(true, true)).toBe(true);
      expect(TruthFunctions.implies(true, false)).toBe(false);
      expect(TruthFunctions.implies(false, true)).toBe(true);
      expect(TruthFunctions.implies(false, false)).toBe(true);
    });

    it('evaluates Biconditional and XOR as mutual duals', () => {
      expect(TruthFunctions.iff(true, true)).toBe(true);
      expect(TruthFunctions.iff(true, false)).toBe(false);
      expect(TruthFunctions.xor(true, true)).toBe(false);
      expect(TruthFunctions.xor(true, false)).toBe(true);

      const pVals = [true, false];
      const qVals = [true, false];
      for (const p of pVals) {
        for (const q of qVals) {
          expect(TruthFunctions.iff(p, q)).toBe(!TruthFunctions.xor(p, q));
        }
      }
    });

    it('evaluates universal NAND and NOR', () => {
      expect(TruthFunctions.nand(true, true)).toBe(false);
      expect(TruthFunctions.nand(true, false)).toBe(true);

      expect(TruthFunctions.nor(false, false)).toBe(true);
      expect(TruthFunctions.nor(true, false)).toBe(false);
    });
  });

  describe('Connective properties', () => {
    it('validates commutativity and associativity', () => {
      expect(getConnectiveProperties('AND').isCommutative).toBe(true);
      expect(getConnectiveProperties('AND').isAssociative).toBe(true);
      expect(getConnectiveProperties('IMPLIES').isCommutative).toBe(false);
      expect(getConnectiveProperties('IMPLIES').isAssociative).toBe(false);
    });

    it('generates correct truth table for operators', () => {
      const andTable = getOperatorTruthTable('AND');
      expect(andTable).toHaveLength(4);
      expect(andTable[0]).toEqual({ p: true, q: true, result: true });
      expect(andTable[1]).toEqual({ p: true, q: false, result: false });
    });
  });

  describe('Functional Completeness', () => {
    it('identifies universal singletons', () => {
      expect(isFunctionallyComplete(['NAND'])).toBe(true);
      expect(isFunctionallyComplete(['NOR'])).toBe(true);
    });

    it('identifies standard complete pairs', () => {
      expect(isFunctionallyComplete(['NOT', 'AND'])).toBe(true);
      expect(isFunctionallyComplete(['NOT', 'OR'])).toBe(true);
      expect(isFunctionallyComplete(['NOT', 'IMPLIES'])).toBe(true);
    });

    it('rejects incomplete sets', () => {
      expect(isFunctionallyComplete(['AND', 'OR'])).toBe(false); // cannot express NOT
      expect(isFunctionallyComplete(['AND'])).toBe(false);
      expect(isFunctionallyComplete(['NOT'])).toBe(false);
    });
  });
});
