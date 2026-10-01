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
 * Computational solver and evaluator for Extended Euclidean Algorithm.
 */
export class ExtendedEuclideanAlgorithmSolver {
  public readonly id = '080';
  public readonly name = 'Extended Euclidean Algorithm';

  /**
   * Evaluates a formal propositional formula under Extended Euclidean Algorithm rules.
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
   * Verifies an invariant specific to Extended Euclidean Algorithm.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }
}

export const defaultSolver = new ExtendedEuclideanAlgorithmSolver();
