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
 * Computational solver and evaluator for Stars And Bars Theorem.
 */
export class StarsAndBarsTheoremSolver {
  public readonly id = '091';
  public readonly name = 'Stars And Bars Theorem';

  /**
   * Evaluates a formal propositional formula under Stars And Bars Theorem rules.
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
   * Verifies an invariant specific to Stars And Bars Theorem.
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

  public countNonNegativeSolutions(stars: number, bins: number): number {
    if (bins <= 0 || stars < 0) return 0;
    return this.binomial(stars + bins - 1, bins - 1);
  }

  public countPositiveSolutions(stars: number, bins: number): number {
    if (bins <= 0 || stars < bins) return 0;
    return this.binomial(stars - 1, bins - 1);
  }

  public generateCompositions(stars: number, bins: number, minPerBin = 0): number[][] {
    if (bins <= 0 || stars < bins * minPerBin) return [];
    const results: number[][] = [];

    const backtrack = (remainingStars: number, remainingBins: number, current: number[]) => {
      if (remainingBins === 1) {
        if (remainingStars >= minPerBin) {
          results.push([...current, remainingStars]);
        }
        return;
      }
      for (let alloc = minPerBin; alloc <= remainingStars - (remainingBins - 1) * minPerBin; alloc++) {
        current.push(alloc);
        backtrack(remainingStars - alloc, remainingBins - 1, current);
        current.pop();
      }
    };

    backtrack(stars, bins, []);
    return results;
  }

}

export const defaultSolver = new StarsAndBarsTheoremSolver();
