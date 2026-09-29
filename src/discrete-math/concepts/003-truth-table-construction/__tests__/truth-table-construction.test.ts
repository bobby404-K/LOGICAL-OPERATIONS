import { describe, it, expect } from 'vitest';
import {
  constructTruthTable,
  extractSubformulas,
  formatTruthTableAscii,
  generateTruthAssignments
} from '../index';
import { parseLogicalExpression } from '../../../../parser/parser';

describe('Concept 003: Truth Table Construction', () => {
  describe('Lexicographic Row Generation', () => {
    it('generates 2^n valuations in canonical descending binary order', () => {
      const rows1 = generateTruthAssignments(['p']);
      expect(rows1).toEqual([{ p: true }, { p: false }]);

      const rows2 = generateTruthAssignments(['p', 'q']);
      expect(rows2).toHaveLength(4);
      expect(rows2[0]).toEqual({ p: true, q: true });
      expect(rows2[1]).toEqual({ p: true, q: false });
      expect(rows2[2]).toEqual({ p: false, q: true });
      expect(rows2[3]).toEqual({ p: false, q: false });
    });
  });

  describe('Subformula Extraction & Dependency Ordering', () => {
    it('orders subformulas by increasing syntactic depth', () => {
      const { ast } = parseLogicalExpression('(p ∧ q) → ¬r');
      const subformulas = extractSubformulas(ast);

      const exprs = subformulas.map(s => s.expression);
      expect(exprs).toContain('(p ∧ q)');
      expect(exprs).toContain('(¬r)');
      expect(exprs).toContain('((p ∧ q) → (¬r))');

      // (p ∧ q) and (¬r) have depth 1, whereas the implication has depth 2
      const impSub = subformulas.find(s => s.expression === '((p ∧ q) → (¬r))');
      const andSub = subformulas.find(s => s.expression === '(p ∧ q)');
      expect(impSub!.depth).toBeGreaterThan(andSub!.depth);
    });
  });

  describe('constructTruthTable', () => {
    it('correctly constructs truth table for conditional expression', () => {
      const table = constructTruthTable('p → q');
      expect(table.variables).toEqual(['p', 'q']);
      expect(table.rowCount).toBe(4);

      // (p -> q) is T, F, T, T
      const results = table.rows.map(r => r.finalValue);
      expect(results).toEqual([true, false, true, true]);
    });

    it('correctly constructs truth table for 3 variables', () => {
      const table = constructTruthTable('(p ∧ q) ∨ r');
      expect(table.variables).toEqual(['p', 'q', 'r']);
      expect(table.rowCount).toBe(8);
      expect(table.rows[0].finalValue).toBe(true); // T ∧ T ∨ T = T
      expect(table.rows[7].finalValue).toBe(false); // F ∧ F ∨ F = F
    });

    it('formats readable Markdown ASCII table', () => {
      const table = constructTruthTable('p ∧ ¬p');
      const ascii = formatTruthTableAscii(table);
      expect(ascii).toContain('| p |');
      expect(ascii).toContain('| --- |');
      expect(ascii).toContain('| F |');
    });
  });
});
