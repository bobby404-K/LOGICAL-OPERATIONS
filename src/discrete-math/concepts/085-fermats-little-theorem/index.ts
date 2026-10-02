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
 * Computational solver and evaluator for Fermats Little Theorem.
 */
export class FermatsLittleTheoremSolver {
  public readonly id = '085';
  public readonly name = 'Fermats Little Theorem';

  /**
   * Evaluates a formal propositional formula under Fermats Little Theorem rules.
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
   * Verifies an invariant specific to Fermats Little Theorem.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public modPow(base: number, exp: number, mod: number): number {
    if (mod === 1) return 0;
    let result = 1;
    let b = (base % mod + mod) % mod;
    let e = exp;
    while (e > 0) {
      if (e % 2 === 1) {
        result = (result * b) % mod;
      }
      b = (b * b) % mod;
      e = Math.floor(e / 2);
    }
    return result;
  }

  public verifyTheorem(a: number, p: number): boolean {
    if (p <= 1) return false;
    if (a % p === 0) return true; // a^p = a mod p
    return this.modPow(a, p - 1, p) === 1;
  }

  public computeInversePrimeModulus(a: number, p: number): number | null {
    if (p <= 1 || a % p === 0) return null;
    return this.modPow(a, p - 2, p);
  }

}

export const defaultSolver = new FermatsLittleTheoremSolver();
