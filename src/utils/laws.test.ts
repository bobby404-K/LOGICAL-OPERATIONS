import { describe, it, expect } from 'vitest';
import { LOGIC_LAWS } from './laws';
import { parseLogicalExpression } from '../parser/parser';
import { generateTruthAssignments } from '../truth-table/generator';
import { evaluateAST } from '../parser/evaluator';

describe('Propositional Logic Laws Catalog', () => {
  it('contains at least 20 curated laws across multiple categories', () => {
    expect(LOGIC_LAWS.length).toBeGreaterThanOrEqual(20);
    const categories = new Set(LOGIC_LAWS.map((l) => l.category));
    expect(categories.has('De Morgan')).toBe(true);
    expect(categories.has('Distributive')).toBe(true);
    expect(categories.has('Conditionals')).toBe(true);
    expect(categories.has('Absorption')).toBe(true);
    expect(categories.has('Rules of Inference')).toBe(true);
  });

  LOGIC_LAWS.forEach((law) => {
    it(`law "${law.name}" has valid syntax and evaluates as a tautology`, () => {
      // 1. Verify parser can parse the tautology expression
      const parseResult = parseLogicalExpression(law.tautologyExpression);
      expect(parseResult.ast).toBeDefined();

      // 2. Generate truth assignments for its variables
      const rows = generateTruthAssignments(parseResult.variables);
      expect(rows.length).toBe(Math.pow(2, parseResult.variables.length));

      // 3. Verify every row evaluates to True (Tautology check)
      rows.forEach((row) => {
        const val = evaluateAST(parseResult.ast, row);
        expect(val).toBe(true);
      });

      // 4. Test interactive sandbox functions match on all combinations
      const bools = [true, false];
      bools.forEach((p) => {
        bools.forEach((q) => {
          bools.forEach((r) => {
            const lhsVal = law.evalLhs(p, q, r);
            const rhsVal = law.evalRhs(p, q, r);
            if (law.category === 'Rules of Inference') {
              // For inference rule: lhs -> rhs is a tautology (i.e. !lhs || rhs is true)
              expect(!lhsVal || rhsVal).toBe(true);
            } else {
              // For equivalences: lhs must strictly match rhs
              expect(lhsVal).toBe(rhsVal);
            }
          });
        });
      });
    });
  });
});
