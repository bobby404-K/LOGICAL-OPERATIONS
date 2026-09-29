import { OperatorType } from '../../../types';

export const TruthFunctions = {
  not: (p: boolean): boolean => !p,
  and: (p: boolean, q: boolean): boolean => p && q,
  or: (p: boolean, q: boolean): boolean => p || q,
  implies: (p: boolean, q: boolean): boolean => !p || q,
  iff: (p: boolean, q: boolean): boolean => p === q,
  xor: (p: boolean, q: boolean): boolean => p !== q,
  nand: (p: boolean, q: boolean): boolean => !(p && q),
  nor: (p: boolean, q: boolean): boolean => !(p || q)
};

export interface ConnectiveProperties {
  symbol: string;
  name: string;
  arity: 1 | 2;
  isCommutative: boolean;
  isAssociative: boolean;
  isIdempotent: boolean;
  identityElement?: boolean; // e.g. True for AND, False for OR
  annihilatorElement?: boolean; // e.g. False for AND, True for OR
}

export function evaluateConnective(op: OperatorType, p: boolean, q?: boolean): boolean {
  switch (op) {
    case 'NOT':
      return TruthFunctions.not(p);
    case 'AND':
      return TruthFunctions.and(p, q ?? false);
    case 'OR':
      return TruthFunctions.or(p, q ?? false);
    case 'IMPLIES':
      return TruthFunctions.implies(p, q ?? false);
    case 'IFF':
      return TruthFunctions.iff(p, q ?? false);
    case 'XOR':
      return TruthFunctions.xor(p, q ?? false);
    case 'NAND':
      return TruthFunctions.nand(p, q ?? false);
    case 'NOR':
      return TruthFunctions.nor(p, q ?? false);
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
}

export function getConnectiveProperties(op: OperatorType): ConnectiveProperties {
  switch (op) {
    case 'NOT':
      return {
        symbol: '¬',
        name: 'Negation',
        arity: 1,
        isCommutative: false,
        isAssociative: false,
        isIdempotent: false
      };
    case 'AND':
      return {
        symbol: '∧',
        name: 'Conjunction',
        arity: 2,
        isCommutative: true,
        isAssociative: true,
        isIdempotent: true,
        identityElement: true,
        annihilatorElement: false
      };
    case 'OR':
      return {
        symbol: '∨',
        name: 'Disjunction',
        arity: 2,
        isCommutative: true,
        isAssociative: true,
        isIdempotent: true,
        identityElement: false,
        annihilatorElement: true
      };
    case 'IMPLIES':
      return {
        symbol: '→',
        name: 'Material Implication',
        arity: 2,
        isCommutative: false,
        isAssociative: false,
        isIdempotent: false
      };
    case 'IFF':
      return {
        symbol: '↔',
        name: 'Biconditional / Equivalence',
        arity: 2,
        isCommutative: true,
        isAssociative: true,
        isIdempotent: false,
        identityElement: true
      };
    case 'XOR':
      return {
        symbol: '⊕',
        name: 'Exclusive Disjunction',
        arity: 2,
        isCommutative: true,
        isAssociative: true,
        isIdempotent: false,
        identityElement: false
      };
    case 'NAND':
      return {
        symbol: '↑',
        name: 'Sheffer Stroke / NAND',
        arity: 2,
        isCommutative: true,
        isAssociative: false,
        isIdempotent: false
      };
    case 'NOR':
      return {
        symbol: '↓',
        name: 'Peirce Arrow / NOR',
        arity: 2,
        isCommutative: true,
        isAssociative: false,
        isIdempotent: false
      };
  }
}

export function getOperatorTruthTable(op: OperatorType): Array<{ p: boolean; q?: boolean; result: boolean }> {
  if (op === 'NOT') {
    return [
      { p: true, result: evaluateConnective('NOT', true) },
      { p: false, result: evaluateConnective('NOT', false) }
    ];
  }

  const combinations = [
    { p: true, q: true },
    { p: true, q: false },
    { p: false, q: true },
    { p: false, q: false }
  ];

  return combinations.map(row => ({
    p: row.p,
    q: row.q,
    result: evaluateConnective(op, row.p, row.q)
  }));
}

/**
 * Checks whether a set of logical connectives is functionally complete.
 * Implements functional completeness verification using Post's criteria / universal reduction.
 */
export function isFunctionallyComplete(connectives: OperatorType[]): boolean {
  const set = new Set(connectives);

  // Single universal gates
  if (set.has('NAND') || set.has('NOR')) {
    return true;
  }

  // Classical pairs with NOT
  if (set.has('NOT')) {
    if (set.has('AND') || set.has('OR') || set.has('IMPLIES')) {
      return true;
    }
  }

  // Implication with false/contradiction constant: {→, ⊥} or implication + XOR (can synthesize NOT and AND)
  if (set.has('IMPLIES') && set.has('XOR')) {
    // p ⊕ p = 0; p → 0 = ¬p; ¬(p → ¬q) = p ∧ q
    return true;
  }

  return false;
}
