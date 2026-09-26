import { OperatorType, VariableName, ALLOWED_VARIABLES } from '../types';

export const OPERATOR_MAP: Record<string, OperatorType> = {
  // NOT
  '¬': 'NOT',
  '~': 'NOT',
  '!': 'NOT',
  'NOT': 'NOT',

  // AND
  '∧': 'AND',
  '&': 'AND',
  '/\\': 'AND',
  'AND': 'AND',

  // OR
  '∨': 'OR',
  '|': 'OR',
  '\\/': 'OR',
  'OR': 'OR',

  // IMPLIES
  '→': 'IMPLIES',
  '->': 'IMPLIES',
  '=>': 'IMPLIES',
  'IMPLIES': 'IMPLIES',
  'IMPLICATION': 'IMPLIES',

  // IFF / BICONDITIONAL
  '↔': 'IFF',
  '<->': 'IFF',
  '<=>': 'IFF',
  'IFF': 'IFF',
  'BICONDITIONAL': 'IFF',

  // XOR
  '⊕': 'XOR',
  '^': 'XOR',
  'XOR': 'XOR',

  // NAND
  '↑': 'NAND',
  'NAND': 'NAND',

  // NOR
  '↓': 'NOR',
  'NOR': 'NOR',
};

export const OPERATOR_SYMBOLS: Record<OperatorType, string> = {
  NOT: '¬',
  AND: '∧',
  OR: '∨',
  IMPLIES: '→',
  IFF: '↔',
  XOR: '⊕',
  NAND: '↑',
  NOR: '↓',
};

export function isAllowedVariable(char: string): char is VariableName {
  return (ALLOWED_VARIABLES as readonly string[]).includes(char.toLowerCase());
}
