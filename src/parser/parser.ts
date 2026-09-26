import { ASTNode, Token, VariableName, ALLOWED_VARIABLES } from '../types';
import { tokenize, TokenizerError } from './tokenizer';

export class ParserError extends Error {
  position: number;
  constructor(message: string, position: number) {
    super(message);
    this.name = 'ParserError';
    this.position = position;
  }
}

export interface ParseResult {
  ast: ASTNode;
  variables: VariableName[];
  variableCount: number;
  rowCount: number;
}

export class ExpressionParser {
  private tokens: Token[] = [];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.current = 0;
  }

  private peek(): Token {
    return this.tokens[this.current] || { type: 'EOF', value: '', position: -1 };
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private isAtEnd(): boolean {
    return this.peek().type === 'EOF';
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  }

  private check(type: Token['type'], opType?: Token['opType']): boolean {
    if (this.isAtEnd()) return false;
    const token = this.peek();
    if (token.type !== type) return false;
    if (opType !== undefined && token.opType !== opType) return false;
    return true;
  }

  private match(type: Token['type'], opType?: Token['opType']): boolean {
    if (this.check(type, opType)) {
      this.advance();
      return true;
    }
    return false;
  }

  public parse(): ASTNode {
    if (this.isAtEnd() || (this.tokens.length === 1 && this.tokens[0].type === 'EOF')) {
      throw new ParserError('Enter a logical expression first.', 0);
    }

    const ast = this.parseBiconditional();

    if (!this.isAtEnd()) {
      const extra = this.peek();
      throw new ParserError(
        `Unexpected token '${extra.value}' at position ${extra.position + 1}. Expected an operator or end of expression.`,
        extra.position
      );
    }

    return ast;
  }

  // Precedence level 5 (Lowest): Biconditional (↔, IFF)
  private parseBiconditional(): ASTNode {
    let expr = this.parseImplication();

    while (this.match('OPERATOR', 'IFF')) {
      const right = this.parseImplication();
      expr = {
        type: 'IFF',
        left: expr,
        right,
      };
    }

    return expr;
  }

  // Precedence level 4: Implication (→, IMPLIES) - Right-associative
  private parseImplication(): ASTNode {
    const expr = this.parseDisjunction();

    if (this.match('OPERATOR', 'IMPLIES')) {
      const right = this.parseImplication(); // Right associative!
      return {
        type: 'IMPLIES',
        left: expr,
        right,
      };
    }

    return expr;
  }

  // Precedence level 3: Disjunction (∨ OR, ⊕ XOR, ↓ NOR)
  private parseDisjunction(): ASTNode {
    let expr = this.parseConjunction();

    while (
      this.check('OPERATOR', 'OR') ||
      this.check('OPERATOR', 'XOR') ||
      this.check('OPERATOR', 'NOR')
    ) {
      const token = this.advance();
      const op = token.opType as 'OR' | 'XOR' | 'NOR';
      const right = this.parseConjunction();
      expr = {
        type: op,
        left: expr,
        right,
      };
    }

    return expr;
  }

  // Precedence level 2: Conjunction (∧ AND, ↑ NAND)
  private parseConjunction(): ASTNode {
    let expr = this.parseUnary();

    while (
      this.check('OPERATOR', 'AND') ||
      this.check('OPERATOR', 'NAND')
    ) {
      const token = this.advance();
      const op = token.opType as 'AND' | 'NAND';
      const right = this.parseUnary();
      expr = {
        type: op,
        left: expr,
        right,
      };
    }

    return expr;
  }

  // Precedence level 1: Unary NOT (¬)
  private parseUnary(): ASTNode {
    if (this.match('OPERATOR', 'NOT')) {
      const operand = this.parseUnary();
      return {
        type: 'NOT',
        operand,
      };
    }

    return this.parsePrimary();
  }

  // Atoms: Variable or Parenthesized Expression
  private parsePrimary(): ASTNode {
    if (this.match('VARIABLE')) {
      const token = this.previous();
      return {
        type: 'VARIABLE',
        name: token.value as VariableName,
      };
    }

    if (this.match('LPAREN')) {
      const lparenPos = this.previous().position;
      const expr = this.parseBiconditional();
      if (!this.match('RPAREN')) {
        throw new ParserError(
          `Missing closing parenthesis ')' for '(' at position ${lparenPos + 1}`,
          lparenPos
        );
      }
      return expr;
    }

    const currentToken = this.peek();
    if (currentToken.type === 'OPERATOR') {
      const prev = this.current > 0 ? this.previous() : null;
      if (!prev) {
        throw new ParserError(
          `Unexpected operator '${currentToken.value}' at start of expression. Expected a variable, '¬', or '('.`,
          currentToken.position
        );
      } else {
        throw new ParserError(
          `Expected a variable or '(' after '${prev.value}' at position ${currentToken.position + 1}.`,
          currentToken.position
        );
      }
    }

    if (currentToken.type === 'RPAREN') {
      throw new ParserError(
        `Unexpected closing parenthesis ')' at position ${currentToken.position + 1}.`,
        currentToken.position
      );
    }

    if (currentToken.type === 'EOF') {
      const prev = this.current > 0 ? this.previous() : null;
      if (prev) {
        throw new ParserError(
          `Expected a variable or '(' after '${prev.value}' at end of expression.`,
          prev.position + prev.value.length
        );
      }
      throw new ParserError('Enter a logical expression first.', 0);
    }

    throw new ParserError(
      `Unexpected symbol '${currentToken.value}' at position ${currentToken.position + 1}`,
      currentToken.position
    );
  }
}

export function extractVariables(ast: ASTNode): VariableName[] {
  const vars = new Set<VariableName>();

  function traverse(node: ASTNode) {
    if (node.type === 'VARIABLE') {
      vars.add(node.name);
    } else if (node.type === 'NOT') {
      traverse(node.operand);
    } else {
      traverse(node.left);
      traverse(node.right);
    }
  }

  traverse(ast);

  // Sort according to ALLOWED_VARIABLES standard order: p, q, r, s, t, u, v, w, x, y
  return ALLOWED_VARIABLES.filter((v) => vars.has(v));
}

export function parseLogicalExpression(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new ParserError('Enter a logical expression first.', 0);
  }

  const tokens = tokenize(trimmed);
  const parser = new ExpressionParser(tokens);
  const ast = parser.parse();

  const variables = extractVariables(ast);
  if (variables.length > 10) {
    throw new ParserError(
      `Maximum supported variables: 10. Found ${variables.length} variables (${variables.join(', ')}).`,
      0
    );
  }

  return {
    ast,
    variables,
    variableCount: variables.length,
    rowCount: Math.pow(2, variables.length),
  };
}
