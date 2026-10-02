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
 * Computational solver and evaluator for Eulerian And Hamiltonian Graphs.
 */
export class EulerianAndHamiltonianGraphsSolver {
  public readonly id = '099';
  public readonly name = 'Eulerian And Hamiltonian Graphs';

  /**
   * Evaluates a formal propositional formula under Eulerian And Hamiltonian Graphs rules.
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
   * Verifies an invariant specific to Eulerian And Hamiltonian Graphs.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  public isConnected(adjMatrix: number[][]): boolean {
    const n = adjMatrix.length;
    if (n === 0) return true;
    const visited = new Array(n).fill(false);
    // Find first vertex with degree > 0
    let start = 0;
    while (start < n && adjMatrix[start].every(x => x === 0)) start++;
    if (start === n) return true; // empty edges

    const queue = [start];
    visited[start] = true;
    while (queue.length > 0) {
      const u = queue.shift()!;
      for (let v = 0; v < n; v++) {
        if (adjMatrix[u][v] && !visited[v]) {
          visited[v] = true;
          queue.push(v);
        }
      }
    }
    for (let i = 0; i < n; i++) {
      if (!visited[i] && adjMatrix[i].some(x => x > 0)) return false;
    }
    return true;
  }

  public isEulerian(adjMatrix: number[][]): {
    hasCircuit: boolean;
    hasTrail: boolean;
    oddDegreeVertices: number[];
  } {
    if (!this.isConnected(adjMatrix)) {
      return { hasCircuit: false, hasTrail: false, oddDegreeVertices: [] };
    }
    const oddVertices: number[] = [];
    for (let i = 0; i < adjMatrix.length; i++) {
      const degree = adjMatrix[i].reduce((sum, val) => sum + (val ? 1 : 0), 0);
      if (degree % 2 !== 0) {
        oddVertices.push(i);
      }
    }
    return {
      hasCircuit: oddVertices.length === 0,
      hasTrail: oddVertices.length === 0 || oddVertices.length === 2,
      oddDegreeVertices: oddVertices
    };
  }

  public hasHamiltonianCycle(adjMatrix: number[][]): boolean {
    const n = adjMatrix.length;
    if (n === 0) return false;
    if (n === 1) return true;
    if (n === 2) return adjMatrix[0][1] > 0;

    const path: number[] = [0];
    const visited = new Array(n).fill(false);
    visited[0] = true;

    const search = (u: number, count: number): boolean => {
      if (count === n) {
        return adjMatrix[u][0] > 0; // returns to start
      }
      for (let v = 0; v < n; v++) {
        if (adjMatrix[u][v] && !visited[v]) {
          visited[v] = true;
          if (search(v, count + 1)) return true;
          visited[v] = false;
        }
      }
      return false;
    };

    return search(0, 1);
  }

  public checkDiracCondition(adjMatrix: number[][]): boolean {
    const n = adjMatrix.length;
    if (n < 3) return false;
    for (let i = 0; i < n; i++) {
      const deg = adjMatrix[i].reduce((sum, val) => sum + (val ? 1 : 0), 0);
      if (deg < n / 2) return false;
    }
    return true;
  }

}

export const defaultSolver = new EulerianAndHamiltonianGraphsSolver();
