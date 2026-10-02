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
 * Computational solver and evaluator for Binomial Theorem.
 */
export class BinomialTheoremSolver {
  public readonly id = '092';
  public readonly name = 'Binomial Theorem';

  /**
   * Evaluates a formal propositional formula under Binomial Theorem rules.
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
   * Verifies an invariant specific to Binomial Theorem.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  private binomial(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    const effK = Math.min(k, n - k);
    let num = 1, den = 1;
    for (let i = 1; i <= effK; i++) {
      num *= (n - i + 1);
      den *= i;
    }
    return Math.round(num / den);
  }

  public expandCoefficients(n: number): number[] {
    const coeffs: number[] = [];
    for (let k = 0; k <= n; k++) {
      coeffs.push(this.binomial(n, k));
    }
    return coeffs;
  }

  public evaluatePolynomial(n: number, x: number, y: number): number {
    const direct = Math.pow(x + y, n);
    return Math.round(direct);
  }

  public formatExpansion(n: number): string {
    const terms: string[] = [];
    for (let k = 0; k <= n; k++) {
      const c = this.binomial(n, k);
      const xPow = n - k;
      const yPow = k;
      let part = '';
      if (c !== 1 || (xPow === 0 && yPow === 0)) part += c;
      if (xPow > 0) part += xPow === 1 ? 'x' : `x^${xPow}`;
      if (yPow > 0) part += yPow === 1 ? 'y' : `y^${yPow}`;
      terms.push(part);
    }
    return terms.join(' + ');
  }

}

export const defaultSolver = new BinomialTheoremSolver();
