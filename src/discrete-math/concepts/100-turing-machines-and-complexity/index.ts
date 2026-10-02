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
 * Computational solver and evaluator for Turing Machines And Complexity.
 */
export class TuringMachinesAndComplexitySolver {
  public readonly id = '100';
  public readonly name = 'Turing Machines And Complexity';

  /**
   * Evaluates a formal propositional formula under Turing Machines And Complexity rules.
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
   * Verifies an invariant specific to Turing Machines And Complexity.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  private transitions: Map<string, { writeSym: string; move: 'L' | 'R' | 'N'; nextState: string }> = new Map();

  public addTransition(
    state: string,
    readSym: string,
    writeSym: string,
    move: 'L' | 'R' | 'N',
    nextState: string
  ): void {
    this.transitions.set(`${state}:${readSym}`, { writeSym, move, nextState });
  }

  public clearTransitions(): void {
    this.transitions.clear();
  }

  public simulate(
    inputTape: string[],
    startState = 'q0',
    acceptState = 'q_accept',
    rejectState = 'q_reject',
    maxSteps = 1000
  ): {
    accepted: boolean;
    halted: boolean;
    steps: number;
    finalTape: string[];
    headPosition: number;
  } {
    const tape = [...inputTape];
    if (tape.length === 0) tape.push('_');
    let head = 0;
    let state = startState;
    let steps = 0;

    while (steps < maxSteps) {
      if (state === acceptState) {
        return { accepted: true, halted: true, steps, finalTape: tape, headPosition: head };
      }
      if (state === rejectState) {
        return { accepted: false, halted: true, steps, finalTape: tape, headPosition: head };
      }

      while (head >= tape.length) tape.push('_');
      while (head < 0) {
        tape.unshift('_');
        head = 0;
      }

      const sym = tape[head] || '_';
      const rule = this.transitions.get(`${state}:${sym}`);
      if (!rule) {
        // No transition -> halts (rejected)
        return { accepted: false, halted: true, steps, finalTape: tape, headPosition: head };
      }

      tape[head] = rule.writeSym;
      if (rule.move === 'R') head++;
      else if (rule.move === 'L') head--;
      state = rule.nextState;
      steps++;
    }

    return { accepted: false, halted: false, steps, finalTape: tape, headPosition: head };
  }

  public setupBinaryIncrementer(): void {
    this.clearTransitions();
    // Moves right to end of binary word
    this.addTransition('q0', '0', '0', 'R', 'q0');
    this.addTransition('q0', '1', '1', 'R', 'q0');
    this.addTransition('q0', '_', '_', 'L', 'q1'); // hit blank, step back

    // Increment with carry
    this.addTransition('q1', '0', '1', 'N', 'q_accept'); // 0 + 1 = 1, done
    this.addTransition('q1', '1', '0', 'L', 'q1');       // 1 + 1 = 0 carry left
    this.addTransition('q1', '_', '1', 'N', 'q_accept'); // carry beyond MSB
  }

}

export const defaultSolver = new TuringMachinesAndComplexitySolver();
