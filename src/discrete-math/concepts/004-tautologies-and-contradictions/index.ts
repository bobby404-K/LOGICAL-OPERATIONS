import { TruthAssignment, VariableName } from '../../../types';
import { parseLogicalExpression } from '../../../parser/parser';
import { evaluateAST } from '../../../parser/evaluator';
import { generateTruthAssignments } from '../../../truth-table/generator';

export type FormulaClassification = 'TAUTOLOGY' | 'CONTRADICTION' | 'CONTINGENCY';

export interface ClassificationResult {
  classification: FormulaClassification;
  variables: VariableName[];
  totalValuations: number;
  satisfyingCount: number;
  falsifyingCount: number;
  satisfactionDensity: number; // between 0.0 and 1.0
  satisfyingModels: TruthAssignment[];
  counterexamples: TruthAssignment[];
}

/**
 * Exhaustively analyzes all 2^n valuations to classify a formula as
 * TAUTOLOGY, CONTRADICTION, or CONTINGENCY.
 */
export function classifyFormula(expression: string): ClassificationResult {
  const { ast, variables } = parseLogicalExpression(expression);
  const valuations = generateTruthAssignments(variables);

  const satisfyingModels: TruthAssignment[] = [];
  const counterexamples: TruthAssignment[] = [];

  for (const valuation of valuations) {
    const isTrue = evaluateAST(ast, valuation);
    if (isTrue) {
      satisfyingModels.push(valuation);
    } else {
      counterexamples.push(valuation);
    }
  }

  const totalValuations = valuations.length;
  const satisfyingCount = satisfyingModels.length;
  const falsifyingCount = counterexamples.length;
  const satisfactionDensity = totalValuations > 0 ? satisfyingCount / totalValuations : 0;

  let classification: FormulaClassification;
  if (satisfyingCount === totalValuations) {
    classification = 'TAUTOLOGY';
  } else if (satisfyingCount === 0) {
    classification = 'CONTRADICTION';
  } else {
    classification = 'CONTINGENCY';
  }

  return {
    classification,
    variables,
    totalValuations,
    satisfyingCount,
    falsifyingCount,
    satisfactionDensity,
    satisfyingModels,
    counterexamples
  };
}

/**
 * Returns true iff the formula is universally valid (true under all valuations).
 */
export function isTautology(expression: string): boolean {
  return classifyFormula(expression).classification === 'TAUTOLOGY';
}

/**
 * Returns true iff the formula is unsatisfiable (false under all valuations).
 */
export function isContradiction(expression: string): boolean {
  return classifyFormula(expression).classification === 'CONTRADICTION';
}

/**
 * Returns true iff the formula is satisfiable (has at least 1 satisfying model).
 */
export function isSatisfiable(expression: string): boolean {
  return classifyFormula(expression).satisfyingCount > 0;
}

/**
 * Returns true iff the formula has both satisfying and falsifying valuations.
 */
export function isContingency(expression: string): boolean {
  return classifyFormula(expression).classification === 'CONTINGENCY';
}

/**
 * Finds the first satisfying assignment (model) for the formula, if any exists.
 */
export function findSatisfyingModel(expression: string): TruthAssignment | null {
  const res = classifyFormula(expression);
  return res.satisfyingModels.length > 0 ? res.satisfyingModels[0] : null;
}

/**
 * Finds the first falsifying assignment (counterexample) for the formula, if any exists.
 */
export function findCounterexample(expression: string): TruthAssignment | null {
  const res = classifyFormula(expression);
  return res.counterexamples.length > 0 ? res.counterexamples[0] : null;
}
