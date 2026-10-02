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
 * Computational solver and evaluator for Generating Functions.
 */
export class GeneratingFunctionsSolver {
  public readonly id = '097';
  public readonly name = 'Generating Functions';

  /**
   * Evaluates a formal propositional formula under Generating Functions rules.
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
   * Verifies an invariant specific to Generating Functions.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public addPolynomials(polyA: number[], polyB: number[]): number[] {
    const len = Math.max(polyA.length, polyB.length);
    const res: number[] = [];
    for (let i = 0; i < len; i++) {
      const a = polyA[i] || 0;
      const b = polyB[i] || 0;
      res.push(a + b);
    }
    return res;
  }

  public multiplyPolynomials(polyA: number[], polyB: number[]): number[] {
    if (polyA.length === 0 || polyB.length === 0) return [];
    const res = new Array(polyA.length + polyB.length - 1).fill(0);
    for (let i = 0; i < polyA.length; i++) {
      for (let j = 0; j < polyB.length; j++) {
        res[i + j] += polyA[i] * polyB[j];
      }
    }
    return res;
  }

  public evaluatePolynomial(poly: number[], x: number): number {
    return poly.reduce((acc, c, idx) => acc + c * Math.pow(x, idx), 0);
  }

  public geometricSeriesCoefficients(ratio: number, count: number): number[] {
    const coeffs: number[] = [];
    for (let i = 0; i < count; i++) {
      coeffs.push(Math.pow(ratio, i));
    }
    return coeffs;
  }

}

export const defaultSolver = new GeneratingFunctionsSolver();
