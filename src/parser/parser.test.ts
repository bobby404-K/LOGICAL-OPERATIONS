import { describe, it, expect } from 'vitest';
import { parseLogicalExpression } from './parser';
import { tokenize } from './tokenizer';
import { evaluateAST } from './evaluator';

describe('Expression Tokenizer', () => {
  it('tokenizes standard symbols correctly', () => {
    const tokens = tokenize('(p ∧ q) ∨ ¬r');
    expect(tokens.map((t) => t.type)).toEqual([
      'LPAREN',
      'VARIABLE',
      'OPERATOR',
      'VARIABLE',
      'RPAREN',
      'OPERATOR',
      'OPERATOR',
      'VARIABLE',
      'EOF',
    ]);
  });

  it('tokenizes text aliases correctly', () => {
    const tokens = tokenize('p AND q OR NOT r IMPLIES s IFF t');
    const ops = tokens.filter((t) => t.type === 'OPERATOR').map((t) => t.opType);
    expect(ops).toEqual(['AND', 'OR', 'NOT', 'IMPLIES', 'IFF']);
  });

  it('tokenizes arrows and ASCII aliases correctly', () => {
    const tokens = tokenize('p -> q <-> r /\\ s \\/ t ^ u');
    const ops = tokens.filter((t) => t.type === 'OPERATOR').map((t) => t.opType);
    expect(ops).toEqual(['IMPLIES', 'IFF', 'AND', 'OR', 'XOR']);
  });

  it('throws error for unsupported variable', () => {
    expect(() => tokenize('p ∧ z')).toThrow(/Unsupported variable 'z'/);
  });

  it('throws error for unknown symbol', () => {
    expect(() => tokenize('p @ q')).toThrow(/Unknown symbol '@'/);
  });
});

describe('Expression Parser & AST', () => {
  it('respects precedence: ¬ has higher precedence than ∧', () => {
    // ¬p ∧ q must mean (¬p) ∧ q, not ¬(p ∧ q)
    const res = parseLogicalExpression('¬p ∧ q');
    expect(res.ast.type).toBe('AND');
    if (res.ast.type === 'AND') {
      expect(res.ast.left.type).toBe('NOT');
      expect(res.ast.right.type).toBe('VARIABLE');
    }
  });

  it('respects precedence: ∧ has higher precedence than ∨', () => {
    // p ∨ q ∧ r must mean p ∨ (q ∧ r)
    const res = parseLogicalExpression('p ∨ q ∧ r');
    expect(res.ast.type).toBe('OR');
    if (res.ast.type === 'OR') {
      expect(res.ast.left.type).toBe('VARIABLE');
      expect(res.ast.right.type).toBe('AND');
    }
  });

  it('respects precedence: ∨ has higher precedence than →', () => {
    // p → q ∨ r must mean p → (q ∨ r)
    const res = parseLogicalExpression('p → q ∨ r');
    expect(res.ast.type).toBe('IMPLIES');
    if (res.ast.type === 'IMPLIES') {
      expect(res.ast.left.type).toBe('VARIABLE');
      expect(res.ast.right.type).toBe('OR');
    }
  });

  it('respects precedence: → has higher precedence than ↔', () => {
    // p ↔ q → r must mean p ↔ (q → r)
    const res = parseLogicalExpression('p ↔ q → r');
    expect(res.ast.type).toBe('IFF');
    if (res.ast.type === 'IFF') {
      expect(res.ast.left.type).toBe('VARIABLE');
      expect(res.ast.right.type).toBe('IMPLIES');
    }
  });

  it('allows parentheses to override precedence', () => {
    const res = parseLogicalExpression('¬(p ∧ q)');
    expect(res.ast.type).toBe('NOT');
    if (res.ast.type === 'NOT') {
      expect(res.ast.operand.type).toBe('AND');
    }
  });

  it('handles right-associativity for implication', () => {
    // p → q → r means p → (q → r)
    const res = parseLogicalExpression('p → q → r');
    expect(res.ast.type).toBe('IMPLIES');
    if (res.ast.type === 'IMPLIES') {
      expect(res.ast.left.type).toBe('VARIABLE');
      expect(res.ast.right.type).toBe('IMPLIES');
    }
  });

  it('detects and orders variables consistently', () => {
    const res = parseLogicalExpression('(s ∨ p) ∧ (r ∧ q)');
    expect(res.variables).toEqual(['p', 'q', 'r', 's']);
    expect(res.variableCount).toBe(4);
    expect(res.rowCount).toBe(16);
  });

  it('handles user prompt example: (p ∧ r ∧ s) ∨ (q ∧ t) ∨ (r ∧ ¬t)', () => {
    const res = parseLogicalExpression('(p ∧ r ∧ s) ∨ (q ∧ t) ∨ (r ∧ ¬t)');
    expect(res.variables).toEqual(['p', 'q', 'r', 's', 't']);
    expect(res.variableCount).toBe(5);
    expect(res.rowCount).toBe(32);
  });

  it('handles all 10 variables', () => {
    const expr = 'p ∧ q ∧ r ∧ s ∧ t ∧ u ∧ v ∧ w ∧ x ∧ y';
    const res = parseLogicalExpression(expr);
    expect(res.variables.length).toBe(10);
    expect(res.rowCount).toBe(1024);
  });

  it('throws descriptive error on missing parenthesis', () => {
    expect(() => parseLogicalExpression('(p ∧ q')).toThrow(/Missing closing parenthesis '\)'/);
  });

  it('throws descriptive error on unexpected operator', () => {
    expect(() => parseLogicalExpression('p ∧ ∧ q')).toThrow(/Expected a variable or '\('/);
  });
});

describe('AST Evaluator', () => {
  it('evaluates IMPLIES correctly', () => {
    const { ast } = parseLogicalExpression('p → q');
    expect(evaluateAST(ast, { p: true, q: true })).toBe(true);
    expect(evaluateAST(ast, { p: true, q: false })).toBe(false);
    expect(evaluateAST(ast, { p: false, q: true })).toBe(true);
    expect(evaluateAST(ast, { p: false, q: false })).toBe(true);
  });

  it('evaluates IFF correctly', () => {
    const { ast } = parseLogicalExpression('p ↔ q');
    expect(evaluateAST(ast, { p: true, q: true })).toBe(true);
    expect(evaluateAST(ast, { p: true, q: false })).toBe(false);
    expect(evaluateAST(ast, { p: false, q: true })).toBe(false);
    expect(evaluateAST(ast, { p: false, q: false })).toBe(true);
  });

  it('evaluates XOR correctly', () => {
    const { ast } = parseLogicalExpression('p ⊕ q');
    expect(evaluateAST(ast, { p: true, q: true })).toBe(false);
    expect(evaluateAST(ast, { p: true, q: false })).toBe(true);
    expect(evaluateAST(ast, { p: false, q: true })).toBe(true);
    expect(evaluateAST(ast, { p: false, q: false })).toBe(false);
  });

  it('evaluates NAND and NOR correctly', () => {
    const nand = parseLogicalExpression('p ↑ q').ast;
    expect(evaluateAST(nand, { p: true, q: true })).toBe(false);
    expect(evaluateAST(nand, { p: true, q: false })).toBe(true);

    const nor = parseLogicalExpression('p ↓ q').ast;
    expect(evaluateAST(nor, { p: false, q: false })).toBe(true);
    expect(evaluateAST(nor, { p: true, q: false })).toBe(false);
  });
});
