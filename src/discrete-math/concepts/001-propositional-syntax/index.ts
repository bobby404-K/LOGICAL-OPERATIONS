import { ASTNode, VariableName, OperatorType } from '../../../types';
import { parseLogicalExpression, extractVariables } from '../../../parser/parser';

export interface WFFValidationResult {
  isValid: boolean;
  error?: string;
  ast?: ASTNode;
  variables?: VariableName[];
  depth?: number;
  connectiveCount?: {
    total: number;
    unary: number;
    binary: number;
  };
}

export interface ParenthesesCheckResult {
  balanced: boolean;
  error?: string;
  unclosedCount: number;
}

/**
 * Checks whether parentheses in a formula string are balanced and correctly nested.
 */
export function checkBalancedParentheses(expression: string): ParenthesesCheckResult {
  let openCount = 0;
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === '(') {
      openCount++;
    } else if (char === ')') {
      if (openCount === 0) {
        return {
          balanced: false,
          error: `Mismatched closing parenthesis at position ${i}`,
          unclosedCount: -1
        };
      }
      openCount--;
    }
  }

  if (openCount > 0) {
    return {
      balanced: false,
      error: `Unclosed open parentheses (${openCount} remaining)`,
      unclosedCount: openCount
    };
  }

  return { balanced: true, unclosedCount: 0 };
}

/**
 * Returns the operator precedence level (higher number = tighter binding).
 */
export function getOperatorPrecedence(op: OperatorType): number {
  switch (op) {
    case 'NOT':
      return 5;
    case 'AND':
    case 'NAND':
      return 4;
    case 'OR':
    case 'NOR':
    case 'XOR':
      return 3;
    case 'IMPLIES':
      return 2;
    case 'IFF':
      return 1;
    default:
      return 0;
  }
}

/**
 * Recursively calculates the height / syntactic depth of the formula AST.
 * An atomic proposition has depth 0.
 */
export function calculateFormulaDepth(node: ASTNode): number {
  if (node.type === 'VARIABLE') {
    return 0;
  }
  if (node.type === 'NOT') {
    return 1 + calculateFormulaDepth(node.operand);
  }
  return 1 + Math.max(calculateFormulaDepth(node.left), calculateFormulaDepth(node.right));
}

/**
 * Counts unary and binary connectives in the AST.
 */
export function countConnectives(node: ASTNode): { total: number; unary: number; binary: number } {
  let unary = 0;
  let binary = 0;

  function walk(current: ASTNode) {
    if (current.type === 'NOT') {
      unary++;
      walk(current.operand);
    } else if (current.type !== 'VARIABLE') {
      binary++;
      walk(current.left);
      walk(current.right);
    }
  }

  walk(node);
  return { total: unary + binary, unary, binary };
}

/**
 * Formats an AST as a fully parenthesized string.
 */
export function toFullyParenthesized(node: ASTNode): string {
  if (node.type === 'VARIABLE') {
    return node.name;
  }
  if (node.type === 'NOT') {
    return `(¬${toFullyParenthesized(node.operand)})`;
  }
  const symbolMap: Record<string, string> = {
    AND: '∧',
    OR: '∨',
    IMPLIES: '→',
    IFF: '↔',
    XOR: '⊕',
    NAND: '↑',
    NOR: '↓'
  };
  const sym = symbolMap[node.type] || node.type;
  return `(${toFullyParenthesized(node.left)} ${sym} ${toFullyParenthesized(node.right)})`;
}

/**
 * Validates whether an input string is a syntactically correct Well-Formed Formula (WFF).
 */
export function validateWff(expression: string): WFFValidationResult {
  const parenCheck = checkBalancedParentheses(expression);
  if (!parenCheck.balanced) {
    return { isValid: false, error: parenCheck.error };
  }

  try {
    const parseResult = parseLogicalExpression(expression);
    const depth = calculateFormulaDepth(parseResult.ast);
    const connectiveCount = countConnectives(parseResult.ast);

    return {
      isValid: true,
      ast: parseResult.ast,
      variables: parseResult.variables,
      depth,
      connectiveCount
    };
  } catch (err: any) {
    return {
      isValid: false,
      error: err.message || 'Syntax error in proposition'
    };
  }
}

export { extractVariables };
