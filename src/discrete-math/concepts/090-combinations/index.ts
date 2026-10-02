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
 * Computational solver and evaluator for Combinations.
 */
export class CombinationsSolver {
  public readonly id = '090';
  public readonly name = 'Combinations';

  /**
   * Evaluates a formal propositional formula under Combinations rules.
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
   * Verifies an invariant specific to Combinations.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public count(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    const effectiveK = Math.min(k, n - k);
    let num = 1;
    let den = 1;
    for (let i = 1; i <= effectiveK; i++) {
      num *= (n - i + 1);
      den *= i;
    }
    return Math.round(num / den);
  }

  public combinationsWithRepetition(n: number, k: number): number {
    if (n <= 0) return 0;
    return this.count(n + k - 1, k);
  }

  public generateCombinations<T>(items: T[], k: number): T[][] {
    if (k < 0 || k > items.length) return [];
    if (k === 0) return [[]];
    const results: T[][] = [];

    const backtrack = (start: number, current: T[]) => {
      if (current.length === k) {
        results.push([...current]);
        return;
      }
      for (let i = start; i < items.length; i++) {
        current.push(items[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    };

    backtrack(0, []);
    return results;
  }

}

export const defaultSolver = new CombinationsSolver();
