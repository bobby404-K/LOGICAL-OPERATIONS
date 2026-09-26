import { ASTNode, TruthAssignment } from '../types';

export function evaluateAST(ast: ASTNode, assignment: TruthAssignment): boolean {
  switch (ast.type) {
    case 'VARIABLE': {
      const val = assignment[ast.name];
      if (val === undefined) {
        throw new Error(`Variable '${ast.name}' has no truth value assigned in row.`);
      }
      return val;
    }

    case 'NOT':
      return !evaluateAST(ast.operand, assignment);

    case 'AND':
      return evaluateAST(ast.left, assignment) && evaluateAST(ast.right, assignment);

    case 'OR':
      return evaluateAST(ast.left, assignment) || evaluateAST(ast.right, assignment);

    case 'IMPLIES': {
      const leftVal = evaluateAST(ast.left, assignment);
      const rightVal = evaluateAST(ast.right, assignment);
      // Material implication: p -> q is equivalent to ¬p ∨ q
      return !leftVal || rightVal;
    }

    case 'IFF': {
      const leftVal = evaluateAST(ast.left, assignment);
      const rightVal = evaluateAST(ast.right, assignment);
      // Biconditional: p <-> q is equivalent to (p -> q) ∧ (q -> p)
      return leftVal === rightVal;
    }

    case 'XOR': {
      const leftVal = evaluateAST(ast.left, assignment);
      const rightVal = evaluateAST(ast.right, assignment);
      // Exclusive OR: true if inputs differ
      return leftVal !== rightVal;
    }

    case 'NAND': {
      const leftVal = evaluateAST(ast.left, assignment);
      const rightVal = evaluateAST(ast.right, assignment);
      return !(leftVal && rightVal);
    }

    case 'NOR': {
      const leftVal = evaluateAST(ast.left, assignment);
      const rightVal = evaluateAST(ast.right, assignment);
      return !(leftVal || rightVal);
    }

    default: {
      const _exhaustive: never = ast;
      throw new Error(`Unhandled AST node type: ${JSON.stringify(_exhaustive)}`);
    }
  }
}
