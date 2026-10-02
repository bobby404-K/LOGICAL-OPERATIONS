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
 * Computational solver and evaluator for Permutations.
 */
export class PermutationsSolver {
  public readonly id = '089';
  public readonly name = 'Permutations';

  /**
   * Evaluates a formal propositional formula under Permutations rules.
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
   * Verifies an invariant specific to Permutations.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public factorial(n: number): number {
    if (n < 0) return 0;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  public count(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    let res = 1;
    for (let i = 0; i < k; i++) {
      res *= (n - i);
    }
    return res;
  }

  public generatePermutations<T>(items: T[], k = items.length): T[][] {
    if (k === 0) return [[]];
    if (items.length === 0) return [];
    const results: T[][] = [];

    const backtrack = (current: T[], remaining: T[]) => {
      if (current.length === k) {
        results.push([...current]);
        return;
      }
      for (let i = 0; i < remaining.length; i++) {
        current.push(remaining[i]);
        const nextRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
        backtrack(current, nextRemaining);
        current.pop();
      }
    };

    backtrack([], items);
    return results;
  }

}

export const defaultSolver = new PermutationsSolver();
