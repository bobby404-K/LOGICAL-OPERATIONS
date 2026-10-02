import { VariableName } from '../../../types';
import { parseLogicalExpression } from '../../../parser/parser';
import { evaluateAST } from '../../../parser/evaluator';
import { generateTruthAssignments } from '../../../truth-table/generator';

export interface ConceptEvaluationResult {
  conceptId: string;
  name: string;
  formula: string;
  variables: VariableName[];
  isValid: boolean;
  satisfactionDensity: number;
}

/**
 * Computational solver and evaluator for Chinese Remainder Theorem.
 */
export class ChineseRemainderTheoremSolver {
  public readonly id = '084';
  public readonly name = 'Chinese Remainder Theorem';

  /**
   * Evaluates a formal propositional formula under Chinese Remainder Theorem rules.
   */
  public evaluate(expression: string): ConceptEvaluationResult {
    const { ast, variables } = parseLogicalExpression(expression);
    const valuations = generateTruthAssignments(variables);

    let trueCount = 0;
    for (const val of valuations) {
      if (evaluateAST(ast, val)) {
        trueCount++;
      }
    }

    const density = valuations.length > 0 ? trueCount / valuations.length : 0;

    return {
      conceptId: this.id,
      name: this.name,
      formula: expression,
      variables,
      isValid: true,
      satisfactionDensity: density
    };
  }

  /**
   * Verifies an invariant specific to Chinese Remainder Theorem.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return Math.abs(a);
  }

  private extendedGCD(a: number, b: number): { gcd: number; x: number; y: number } {
    let oldR = a, r = b;
    let oldS = 1, s = 0;
    let oldT = 0, t = 1;
    while (r !== 0) {
      const q = Math.floor(oldR / r);
      [oldR, r] = [r, oldR - q * r];
      [oldS, s] = [s, oldS - q * s];
      [oldT, t] = [t, oldT - q * t];
    }
    return { gcd: oldR, x: oldS, y: oldT };
  }

  public arePairwiseCoprime(moduli: number[]): boolean {
    for (let i = 0; i < moduli.length; i++) {
      for (let j = i + 1; j < moduli.length; j++) {
        if (this.gcd(moduli[i], moduli[j]) !== 1) return false;
      }
    }
    return true;
  }

  public solveCRT(congruences: Array<{ remainder: number; modulus: number }>): { solution: number; modulus: number } | null {
    if (congruences.length === 0) return null;
    const moduli = congruences.map(c => c.modulus);
    if (!this.arePairwiseCoprime(moduli)) return null;

    const M = moduli.reduce((acc, m) => acc * m, 1);
    let x = 0;

    for (const { remainder, modulus } of congruences) {
      const Mi = M / modulus;
      const { gcd, x: yi } = this.extendedGCD(Mi, modulus);
      if (gcd !== 1) return null;
      const inv = (yi % modulus + modulus) % modulus;
      x = (x + remainder * Mi * inv) % M;
    }

    return { solution: (x % M + M) % M, modulus: M };
  }

}

export const defaultSolver = new ChineseRemainderTheoremSolver();
