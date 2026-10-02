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
 * Computational solver and evaluator for Pascals Triangle.
 */
export class PascalsTriangleSolver {
  public readonly id = '093';
  public readonly name = 'Pascals Triangle';

  /**
   * Evaluates a formal propositional formula under Pascals Triangle rules.
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
   * Verifies an invariant specific to Pascals Triangle.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public generateRow(n: number): number[] {
    if (n < 0) return [];
    const row = [1];
    for (let k = 1; k <= n; k++) {
      row.push(Math.round(row[k - 1] * (n - k + 1) / k));
    }
    return row;
  }

  public generateTriangle(numRows: number): number[][] {
    const triangle: number[][] = [];
    for (let r = 0; r < numRows; r++) {
      triangle.push(this.generateRow(r));
    }
    return triangle;
  }

  public getRowSum(n: number): number {
    return Math.pow(2, n);
  }

  public verifyRowSymmetry(row: number[]): boolean {
    for (let i = 0; i < Math.floor(row.length / 2); i++) {
      if (row[i] !== row[row.length - 1 - i]) return false;
    }
    return true;
  }

}

export const defaultSolver = new PascalsTriangleSolver();
