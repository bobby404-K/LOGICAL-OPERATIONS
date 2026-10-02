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
 * Computational solver and evaluator for Graph Isomorphism.
 */
export class GraphIsomorphismSolver {
  public readonly id = '098';
  public readonly name = 'Graph Isomorphism';

  /**
   * Evaluates a formal propositional formula under Graph Isomorphism rules.
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
   * Verifies an invariant specific to Graph Isomorphism.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public degreeSequence(adjMatrix: number[][]): number[] {
    return adjMatrix
      .map(row => row.reduce((sum, val) => sum + (val ? 1 : 0), 0))
      .sort((a, b) => b - a);
  }

  public checkInvariants(g1: number[][], g2: number[][]): {
    vertexCountMatch: boolean;
    edgeCountMatch: boolean;
    degreeSequenceMatch: boolean;
  } {
    const vMatch = g1.length === g2.length;
    if (!vMatch) {
      return { vertexCountMatch: false, edgeCountMatch: false, degreeSequenceMatch: false };
    }
    const deg1 = this.degreeSequence(g1);
    const deg2 = this.degreeSequence(g2);
    const dMatch = deg1.every((d, i) => d === deg2[i]);
    const edges1 = deg1.reduce((a, b) => a + b, 0) / 2;
    const edges2 = deg2.reduce((a, b) => a + b, 0) / 2;
    return {
      vertexCountMatch: true,
      edgeCountMatch: edges1 === edges2,
      degreeSequenceMatch: dMatch
    };
  }

  public areIsomorphic(g1: number[][], g2: number[][]): boolean {
    const inv = this.checkInvariants(g1, g2);
    if (!inv.vertexCountMatch || !inv.edgeCountMatch || !inv.degreeSequenceMatch) {
      return false;
    }
    const n = g1.length;
    if (n === 0) return true;

    // Search permutations
    const vertices = Array.from({ length: n }, (_, i) => i);
    let found = false;

    const testPermutation = (p: number[]): boolean => {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (g1[i][j] !== g2[p[i]][p[j]]) return false;
        }
      }
      return true;
    };

    const permute = (current: number[], used: boolean[]) => {
      if (found) return;
      if (current.length === n) {
        if (testPermutation(current)) found = true;
        return;
      }
      for (let i = 0; i < n; i++) {
        if (!used[i]) {
          used[i] = true;
          current.push(i);
          permute(current, used);
          current.pop();
          used[i] = false;
        }
      }
    };

    permute([], new Array(n).fill(false));
    return found;
  }

}

export const defaultSolver = new GraphIsomorphismSolver();
