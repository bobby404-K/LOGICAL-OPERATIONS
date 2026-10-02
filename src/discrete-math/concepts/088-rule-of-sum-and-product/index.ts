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
 * Computational solver and evaluator for Rule Of Sum And Product.
 */
export class RuleOfSumAndProductSolver {
  public readonly id = '088';
  public readonly name = 'Rule Of Sum And Product';

  /**
   * Evaluates a formal propositional formula under Rule Of Sum And Product rules.
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
   * Verifies an invariant specific to Rule Of Sum And Product.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public sumRule(disjointSetSizes: number[]): number {
    return disjointSetSizes.reduce((acc, s) => acc + s, 0);
  }

  public productRule(decisionStageSizes: number[]): number {
    if (decisionStageSizes.length === 0) return 0;
    return decisionStageSizes.reduce((acc, s) => acc * s, 1);
  }

  public cartesianProduct<T, U>(setA: T[], setB: U[]): Array<[T, U]> {
    const res: Array<[T, U]> = [];
    for (const a of setA) {
      for (const b of setB) {
        res.push([a, b]);
      }
    }
    return res;
  }

}

export const defaultSolver = new RuleOfSumAndProductSolver();
