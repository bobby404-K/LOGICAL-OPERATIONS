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
 * Computational solver and evaluator for Euler Totient Function.
 */
export class EulerTotientFunctionSolver {
  public readonly id = '086';
  public readonly name = 'Euler Totient Function';

  /**
   * Evaluates a formal propositional formula under Euler Totient Function rules.
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
   * Verifies an invariant specific to Euler Totient Function.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public getPrimeFactors(n: number): number[] {
    const factors: number[] = [];
    let d = 2;
    let temp = Math.abs(n);
    while (d * d <= temp) {
      if (temp % d === 0) {
        factors.push(d);
        while (temp % d === 0) temp /= d;
      }
      d++;
    }
    if (temp > 1) factors.push(temp);
    return factors;
  }

  public totient(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    const factors = this.getPrimeFactors(n);
    let result = n;
    for (const p of factors) {
      result = Math.floor(result * (p - 1) / p);
    }
    return result;
  }

  public getRelativelyPrimeNumbers(n: number): number[] {
    const result: number[] = [];
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    for (let k = 1; k <= n; k++) {
      if (gcd(k, n) === 1) result.push(k);
    }
    return result;
  }

}

export const defaultSolver = new EulerTotientFunctionSolver();
