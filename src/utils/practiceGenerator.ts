import { PracticeProblem } from '../types';

export const CURATED_PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'prob-1',
    title: 'Negation of Implication',
    difficulty: 'Beginner',
    expression: '¬(p → q)',
    description: 'Determine the truth values for the negation of a material conditional statement.',
    hints: [
      'Start with the innermost operation inside parentheses: construct a column for (p → q).',
      'Remember that (p → q) is FALSE only when p is True and q is False. In all other cases, it is True.',
      'Recommended column order: 1) p → q, 2) ¬(p → q).'
    ],
    recommendedSteps: ['p → q', '¬(p → q)'],
  },
  {
    id: 'prob-2',
    title: "De Morgan's First Law",
    difficulty: 'Beginner',
    expression: '¬(p ∧ q)',
    description: "Construct the truth table for the negation of a conjunction, then compare with ¬p ∨ ¬q.",
    hints: [
      'First evaluate the conjunction (p ∧ q). Conjunction is True only when both p and q are True.',
      'Next, invert the truth value for each row to obtain ¬(p ∧ q).',
      'Recommended column order: 1) p ∧ q, 2) ¬(p ∧ q).'
    ],
    recommendedSteps: ['p ∧ q', '¬(p ∧ q)'],
  },
  {
    id: 'prob-3',
    title: 'Biconditional with Negation',
    difficulty: 'Beginner',
    expression: 'p ↔ ¬q',
    description: 'A biconditional evaluates to True when both sides have the exact same truth value.',
    hints: [
      'First calculate the negation ¬q for every row.',
      'Then compare variable p with ¬q: output True if they match, False if they differ.',
      'Recommended column order: 1) ¬q, 2) p ↔ ¬q.'
    ],
    recommendedSteps: ['¬q', 'p ↔ ¬q'],
  },
  {
    id: 'prob-4',
    title: 'Compound Disjunction & Conjunction',
    difficulty: 'Intermediate',
    expression: '(p ∧ q) ∨ (¬q ∧ r)',
    description: 'Three variables: construct the intermediate clauses before computing the disjunction.',
    hints: [
      'Break this into three steps: evaluate ¬q, then the left clause (p ∧ q), then the right clause (¬q ∧ r).',
      'For (¬q ∧ r), combine your ¬q column with the r column using AND.',
      'Recommended column order: 1) ¬q, 2) p ∧ q, 3) ¬q ∧ r, 4) (p ∧ q) ∨ (¬q ∧ r).'
    ],
    recommendedSteps: ['¬q', 'p ∧ q', '¬q ∧ r', '(p ∧ q) ∨ (¬q ∧ r)'],
  },
  {
    id: 'prob-5',
    title: 'Hypothetical Syllogism Clause',
    difficulty: 'Intermediate',
    expression: '(p → q) ∧ (q → r)',
    description: 'Examine transitivity of implication across three variables.',
    hints: [
      'Create a column for (p → q) and a column for (q → r).',
      'Then join the two columns with AND: both must be True for the row to be True.',
      'Recommended column order: 1) p → q, 2) q → r, 3) (p → q) ∧ (q → r).'
    ],
    recommendedSteps: ['p → q', 'q → r', '(p → q) ∧ (q → r)'],
  },
  {
    id: 'prob-6',
    title: 'Prompt Challenge: 4 Variables',
    difficulty: 'Advanced',
    expression: '(p ∧ q) ∨ (¬r ∧ s)',
    description: 'Evaluate a 16-row disjunction formed by two independent 2-variable conjunctions.',
    hints: [
      'Start by evaluating ¬r first.',
      'Evaluate (p ∧ q) and (¬r ∧ s) in parallel columns.',
      'Combine them using OR: if either clause is True, the final statement is True.',
      'Recommended column order: 1) ¬r, 2) p ∧ q, 3) ¬r ∧ s, 4) (p ∧ q) ∨ (¬r ∧ s).'
    ],
    recommendedSteps: ['¬r', 'p ∧ q', '¬r ∧ s', '(p ∧ q) ∨ (¬r ∧ s)'],
  },
  {
    id: 'prob-7',
    title: 'Exclusive Disjunction with 3 Variables',
    difficulty: 'Advanced',
    expression: '(p ⊕ q) ∧ (q ∨ ¬r)',
    description: 'Combine exclusive OR with a negated variable disjunction across 8 rows.',
    hints: [
      'Evaluate ¬r first.',
      'Evaluate (p ⊕ q): True when exactly one of p or q is True.',
      'Evaluate (q ∨ ¬r) using the q column and your ¬r column.',
      'Recommended column order: 1) ¬r, 2) p ⊕ q, 3) q ∨ ¬r, 4) (p ⊕ q) ∧ (q ∨ ¬r).'
    ],
    recommendedSteps: ['¬r', 'p ⊕ q', 'q ∨ ¬r', '(p ⊕ q) ∧ (q ∨ ¬r)'],
  },
];

export function generateRandomProblem(difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): PracticeProblem {
  const binaryOps = ['∧', '∨', '→', '⊕'];

  if (difficulty === 'Beginner') {
    // 2 variables, 1 or 2 operators
    const v1 = 'p';
    const v2 = 'q';
    const op = binaryOps[Math.floor(Math.random() * binaryOps.length)];
    const useNot = Math.random() > 0.5;
    const expr = useNot ? `¬(${v1} ${op} ${v2})` : `(¬${v1}) ${op} ${v2}`;
    return {
      id: `random-${Date.now()}`,
      title: `Practice: ${difficulty} Challenge`,
      difficulty,
      expression: expr,
      description: `Evaluate the random 2-variable expression: ${expr}`,
      hints: [
        'Identify whether the negation applies to a single variable or the entire expression.',
        'Evaluate the innermost sub-expression first.',
        `Break it down step-by-step into intermediate columns.`
      ],
      recommendedSteps: useNot ? [`${v1} ${op} ${v2}`, expr] : [`¬${v1}`, expr],
    };
  }

  if (difficulty === 'Intermediate') {
    // 3 variables
    const op1 = binaryOps[Math.floor(Math.random() * binaryOps.length)];
    const op2 = binaryOps[Math.floor(Math.random() * binaryOps.length)];
    const expr = `(p ${op1} ¬q) ${op2} r`;
    return {
      id: `random-${Date.now()}`,
      title: `Practice: ${difficulty} Challenge`,
      difficulty,
      expression: expr,
      description: `Evaluate the random 3-variable expression: ${expr}`,
      hints: [
        'Start with ¬q column.',
        `Evaluate (p ${op1} ¬q) using your p and ¬q columns.`,
        `Finally evaluate the full expression with r using ${op2}.`
      ],
      recommendedSteps: ['¬q', `p ${op1} ¬q`, expr],
    };
  }

  // Advanced: 4 variables
  const op1 = ['∧', '∨'][Math.floor(Math.random() * 2)];
  const op2 = ['∧', '∨'][Math.floor(Math.random() * 2)];
  const rootOp = ['∨', '∧', '→'][Math.floor(Math.random() * 3)];
  const expr = `(p ${op1} q) ${rootOp} (¬r ${op2} s)`;
  return {
    id: `random-${Date.now()}`,
    title: `Practice: ${difficulty} Challenge`,
    difficulty,
    expression: expr,
    description: `Evaluate the random 4-variable expression: ${expr}`,
    hints: [
      'Begin by constructing ¬r.',
      `Compute the left clause (p ${op1} q).`,
      `Compute the right clause (¬r ${op2} s).`,
      `Combine both clauses using the root connective ${rootOp}.`
    ],
    recommendedSteps: ['¬r', `p ${op1} q`, `¬r ${op2} s`, expr],
  };
}
