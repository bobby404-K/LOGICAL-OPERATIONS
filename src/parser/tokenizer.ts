import { Token, VariableName } from '../types';
import { OPERATOR_MAP, isAllowedVariable } from './tokens';

export class TokenizerError extends Error {
  position: number;
  constructor(message: string, position: number) {
    super(message);
    this.name = 'TokenizerError';
    this.position = position;
  }
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = input.length;

  while (i < len) {
    const char = input[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Parentheses
    if (char === '(') {
      tokens.push({ type: 'LPAREN', value: '(', position: i });
      i++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: 'RPAREN', value: ')', position: i });
      i++;
      continue;
    }

    // Check multi-character operators first:
    // <-> or <=>
    if (input.slice(i, i + 3) === '<->' || input.slice(i, i + 3) === '<=>') {
      tokens.push({
        type: 'OPERATOR',
        value: input.slice(i, i + 3),
        opType: 'IFF',
        position: i,
      });
      i += 3;
      continue;
    }

    // -> or =>
    if (input.slice(i, i + 2) === '->' || input.slice(i, i + 2) === '=>') {
      tokens.push({
        type: 'OPERATOR',
        value: input.slice(i, i + 2),
        opType: 'IMPLIES',
        position: i,
      });
      i += 2;
      continue;
    }

    // /\ (AND) or \/ (OR)
    if (input.slice(i, i + 2) === '/\\') {
      tokens.push({
        type: 'OPERATOR',
        value: '/\\',
        opType: 'AND',
        position: i,
      });
      i += 2;
      continue;
    }

    if (input.slice(i, i + 2) === '\\/') {
      tokens.push({
        type: 'OPERATOR',
        value: '\\/',
        opType: 'OR',
        position: i,
      });
      i += 2;
      continue;
    }

    // Single character symbolic operators
    if (OPERATOR_MAP[char]) {
      tokens.push({
        type: 'OPERATOR',
        value: char,
        opType: OPERATOR_MAP[char],
        position: i,
      });
      i++;
      continue;
    }

    // Alphabetic words or variables
    if (/[a-zA-Z]/.test(char)) {
      let word = '';
      const startPos = i;
      while (i < len && /[a-zA-Z]/.test(input[i])) {
        word += input[i];
        i++;
      }

      const upperWord = word.toUpperCase();
      if (OPERATOR_MAP[upperWord]) {
        tokens.push({
          type: 'OPERATOR',
          value: word,
          opType: OPERATOR_MAP[upperWord],
          position: startPos,
        });
        continue;
      }

      // If length is 1, check if valid variable
      if (word.length === 1) {
        const lowerVar = word.toLowerCase();
        if (isAllowedVariable(lowerVar)) {
          tokens.push({
            type: 'VARIABLE',
            value: lowerVar as VariableName,
            position: startPos,
          });
          continue;
        } else {
          throw new TokenizerError(
            `Unsupported variable '${word}' at position ${startPos + 1}. Supported variables: p, q, r, s, t, u, v, w, x, y`,
            startPos
          );
        }
      } else {
        // Multi-letter word that is not a known operator keyword
        throw new TokenizerError(
          `Unknown identifier '${word}' at position ${startPos + 1}. Expected an operator (e.g. AND, OR, NOT) or single-letter variable.`,
          startPos
        );
      }
    }

    // If we reach here, unrecognized character
    throw new TokenizerError(
      `Unknown symbol '${char}' at position ${i + 1}`,
      i
    );
  }

  tokens.push({ type: 'EOF', value: '', position: len });
  return tokens;
}
