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
 * Computational solver and evaluator for Inclusion Exclusion Principle.
 */
export class InclusionExclusionPrincipleSolver {
  public readonly id = '094';
  public readonly name = 'Inclusion Exclusion Principle';

  /**
   * Evaluates a formal propositional formula under Inclusion Exclusion Principle rules.
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
   * Verifies an invariant specific to Inclusion Exclusion Principle.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public unionSize2(sizeA: number, sizeB: number, intersectionAB: number): number {
    return sizeA + sizeB - intersectionAB;
  }

  public unionSize3(
    a: number, b: number, c: number,
    ab: number, bc: number, ac: number,
    abc: number
  ): number {
    return a + b + c - (ab + bc + ac) + abc;
  }

  public computeSetUnionSize<T>(sets: T[][]): number {
    const unique = new Set<T>();
    for (const s of sets) {
      for (const item of s) {
        unique.add(item);
      }
    }
    return unique.size;
  }

  public countOntoFunctions(m: number, n: number): number {
    // Number of surjective functions from set of size m to set of size n
    if (m < n) return 0;
    const binomial = (nVal: number, kVal: number): number => {
      if (kVal < 0 || kVal > nVal) return 0;
      let num = 1, den = 1;
      const k = Math.min(kVal, nVal - kVal);
      for (let i = 1; i <= k; i++) {
        num *= (nVal - i + 1);
        den *= i;
      }
      return Math.round(num / den);
    };

    let total = 0;
    for (let j = 0; j <= n; j++) {
      const sign = (j % 2 === 0) ? 1 : -1;
      total += sign * binomial(n, j) * Math.pow(n - j, m);
    }
    return total;
  }

}

export const defaultSolver = new InclusionExclusionPrincipleSolver();
