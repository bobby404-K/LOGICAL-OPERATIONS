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
 * Computational solver and evaluator for Recurrence Relations.
 */
export class RecurrenceRelationsSolver {
  public readonly id = '096';
  public readonly name = 'Recurrence Relations';

  /**
   * Evaluates a formal propositional formula under Recurrence Relations rules.
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
   * Verifies an invariant specific to Recurrence Relations.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public evaluateLinearRecurrence(coeffs: number[], baseCases: number[], n: number): number {
    const k = coeffs.length;
    if (baseCases.length !== k) throw new Error('Base cases length must equal coeffs length');
    if (n < k) return baseCases[n];

    const sequence = [...baseCases];
    for (let step = k; step <= n; step++) {
      let nextTerm = 0;
      for (let i = 0; i < k; i++) {
        nextTerm += coeffs[i] * sequence[sequence.length - 1 - i];
      }
      sequence.push(nextTerm);
    }
    return sequence[n];
  }

  public fibonacci(n: number): number {
    // a_n = 1*a_{n-1} + 1*a_{n-2}, base cases [0, 1]
    if (n <= 0) return 0;
    return this.evaluateLinearRecurrence([1, 1], [0, 1], n);
  }

  public solveCharacteristicRootsDegree2(c1: number, c2: number): {
    r1: number;
    r2: number;
    type: 'distinct' | 'repeated' | 'complex';
  } {
    const discriminant = c1 * c1 + 4 * c2;
    if (discriminant > 0) {
      const sqrtD = Math.sqrt(discriminant);
      return {
        r1: (c1 + sqrtD) / 2,
        r2: (c1 - sqrtD) / 2,
        type: 'distinct'
      };
    } else if (discriminant === 0) {
      return {
        r1: c1 / 2,
        r2: c1 / 2,
        type: 'repeated'
      };
    } else {
      return {
        r1: c1 / 2,
        r2: Math.sqrt(-discriminant) / 2,
        type: 'complex'
      };
    }
  }

}

export const defaultSolver = new RecurrenceRelationsSolver();
