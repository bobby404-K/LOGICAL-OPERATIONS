import { TruthAssignment, VariableName } from '../../../types';
import { parseLogicalExpression } from '../../../parser/parser';
import { evaluateAST } from '../../../parser/evaluator';
import { generateTruthAssignments } from '../../../truth-table/generator';
import { LOGIC_LAWS, LogicLaw } from '../../../utils/laws';

export interface EquivalenceCheckResult {
  isEquivalent: boolean;
  counterexample?: TruthAssignment;
  checkedCount: number;
  variables: VariableName[];
}

export interface ProofStepResult {
  stepIndex: number;
  from: string;
  to: string;
  isEquivalent: boolean;
  counterexample?: TruthAssignment;
}

export interface ProofChainValidationResult {
  isValid: boolean;
  totalSteps: number;
  stepResults: ProofStepResult[];
  failedStepIndex?: number;
  error?: string;
}

/**
 * Checks whether two propositional expressions are logically equivalent (A ≡ B)
 * by evaluating both expressions across all valuations over the union of their variables.
 */
export function areLogicallyEquivalent(exprA: string, exprB: string): EquivalenceCheckResult {
  const parsedA = parseLogicalExpression(exprA);
  const parsedB = parseLogicalExpression(exprB);

  // Union of variables in canonical order
  const allVarsSet = new Set<VariableName>([...parsedA.variables, ...parsedB.variables]);
  const combinedVars = Array.from(allVarsSet).sort();

  const valuations = generateTruthAssignments(combinedVars);

  for (const valuation of valuations) {
    const valA = evaluateAST(parsedA.ast, valuation);
    const valB = evaluateAST(parsedB.ast, valuation);

    if (valA !== valB) {
      return {
        isEquivalent: false,
        counterexample: valuation,
        checkedCount: valuations.length,
        variables: combinedVars
      };
    }
  }

  return {
    isEquivalent: true,
    checkedCount: valuations.length,
    variables: combinedVars
  };
}

import { isTautology } from '../004-tautologies-and-contradictions';

/**
 * Verifies that a law from the catalog is a valid mathematical equivalence or inference tautology.
 */
export function verifyCatalogLaw(lawId: string): { valid: boolean; law?: LogicLaw; error?: string } {
  const law = LOGIC_LAWS.find(l => l.id === lawId);
  if (!law) {
    return { valid: false, error: `Law '${lawId}' not found in catalog.` };
  }

  if (law.category === 'Rules of Inference') {
    const valid = isTautology(law.tautologyExpression);
    return {
      valid,
      law,
      error: valid ? undefined : `Inference tautology '${law.tautologyExpression}' failed verification.`
    };
  }

  const result = areLogicallyEquivalent(law.lhs, law.rhs);
  return {
    valid: result.isEquivalent,
    law,
    error: result.isEquivalent ? undefined : `Counterexample found: ${JSON.stringify(result.counterexample)}`
  };
}

/**
 * Validates a step-by-step equivalence derivation chain.
 * Given [expr0, expr1, expr2, ...], asserts that expr0 ≡ expr1, expr1 ≡ expr2, etc.
 */
export function verifyProofChain(steps: string[]): ProofChainValidationResult {
  if (steps.length < 2) {
    return {
      isValid: false,
      totalSteps: 0,
      stepResults: [],
      error: 'A proof chain requires at least 2 steps (start and finish).'
    };
  }

  const stepResults: ProofStepResult[] = [];

  for (let i = 0; i < steps.length - 1; i++) {
    const from = steps[i];
    const to = steps[i + 1];
    const check = areLogicallyEquivalent(from, to);

    stepResults.push({
      stepIndex: i + 1,
      from,
      to,
      isEquivalent: check.isEquivalent,
      counterexample: check.counterexample
    });

    if (!check.isEquivalent) {
      return {
        isValid: false,
        totalSteps: steps.length - 1,
        stepResults,
        failedStepIndex: i + 1,
        error: `Invalid equivalence step ${i + 1}: '${from}' is not equivalent to '${to}'`
      };
    }
  }

  return {
    isValid: true,
    totalSteps: steps.length - 1,
    stepResults
  };
}

export { LOGIC_LAWS };
