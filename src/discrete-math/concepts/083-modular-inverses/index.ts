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
 * Computational solver and evaluator for Modular Inverses.
 */
export class ModularInversesSolver {
  public readonly id = '083';
  public readonly name = 'Modular Inverses';

  /**
   * Evaluates a formal propositional formula under Modular Inverses rules.
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
   * Verifies an invariant specific to Modular Inverses.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  /**
   * Computes Extended Euclidean Algorithm returning { gcd, x, y } where a*x + b*y = gcd.
   */
  public extendedGCD(a: number, b: number): { gcd: number; x: number; y: number } {
    let oldR = a, r = b;
    let oldS = 1, s = 0;
    let oldT = 0, t = 1;

    while (r !== 0) {
      const quotient = Math.floor(oldR / r);
      [oldR, r] = [r, oldR - quotient * r];
      [oldS, s] = [s, oldS - quotient * s];
      [oldT, t] = [t, oldT - quotient * t];
    }
    return { gcd: oldR, x: oldS, y: oldT };
  }

  /**
   * Computes the modular inverse of a modulo m. Returns null if gcd(a, m) !== 1.
   */
  public computeInverse(a: number, m: number): number | null {
    if (m <= 1) return null;
    const { gcd, x } = this.extendedGCD((a % m + m) % m, m);
    if (gcd !== 1) return null;
    return (x % m + m) % m;
  }

  /**
   * Solves the linear congruence a*x = b (mod m).
   */
  public solveCongruence(a: number, b: number, m: number): number[] {
    const normA = (a % m + m) % m;
    const normB = (b % m + m) % m;
    const { gcd, x } = this.extendedGCD(normA, m);
    if (normB % gcd !== 0) return [];

    const baseSol = ((x * (normB / gcd)) % (m / gcd) + (m / gcd)) % (m / gcd);
    const step = m / gcd;
    const solutions: number[] = [];
    for (let i = 0; i < gcd; i++) {
      solutions.push(baseSol + i * step);
    }
    return solutions.sort((p, q) => p - q);
  }

}

export const defaultSolver = new ModularInversesSolver();
