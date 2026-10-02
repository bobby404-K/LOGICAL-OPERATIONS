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
 * Computational solver and evaluator for Derangements.
 */
export class DerangementsSolver {
  public readonly id = '095';
  public readonly name = 'Derangements';

  /**
   * Evaluates a formal propositional formula under Derangements rules.
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
   * Verifies an invariant specific to Derangements.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public count(n: number): number {
    if (n < 0) return 0;
    if (n === 0) return 1;
    if (n === 1) return 0;
    let prev2 = 1; // !0
    let prev1 = 0; // !1
    let current = 0;
    for (let i = 2; i <= n; i++) {
      current = (i - 1) * (prev1 + prev2);
      prev2 = prev1;
      prev1 = current;
    }
    return current;
  }

  public isDerangement(original: number[], perm: number[]): boolean {
    if (original.length !== perm.length) return false;
    for (let i = 0; i < original.length; i++) {
      if (original[i] === perm[i]) return false;
    }
    return true;
  }

  public generateDerangements(n: number): number[][] {
    const original = Array.from({ length: n }, (_, i) => i + 1);
    const results: number[][] = [];

    const permute = (current: number[], used: boolean[]) => {
      const idx = current.length;
      if (idx === n) {
        results.push([...current]);
        return;
      }
      for (let val = 1; val <= n; val++) {
        if (!used[val] && val !== original[idx]) {
          used[val] = true;
          current.push(val);
          permute(current, used);
          current.pop();
          used[val] = false;
        }
      }
    };

    permute([], new Array(n + 1).fill(false));
    return results;
  }

}

export const defaultSolver = new DerangementsSolver();
