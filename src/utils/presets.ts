export interface LogicPreset {
  id: string;
  name: string;
  category: 'Classic Laws' | 'Inference Rules' | 'Compound Expressions';
  expression: string;
  description: string;
}

export const PRESETS: LogicPreset[] = [
  {
    id: 'user-example',
    name: "5-Variable Complex Disjunction",
    category: 'Compound Expressions',
    expression: '(p ∧ r ∧ s) ∨ (q ∧ t) ∨ (r ∧ ¬t)',
    description: 'Complex 5-variable disjunction formula with 32 truth table rows.',
  },
  {
    id: 'demorgan-conjunction-law',
    name: "De Morgan's Law (AND)",
    category: 'Classic Laws',
    expression: '¬(p ∧ q) ↔ (¬p ∨ ¬q)',
    description: 'Tautology proving that negating a conjunction yields a disjunction of negations.',
  },
  {
    id: 'demorgan-disjunction-law',
    name: "De Morgan's Law (OR)",
    category: 'Classic Laws',
    expression: '¬(p ∨ q) ↔ (¬p ∧ ¬q)',
    description: 'Tautology proving that negating a disjunction yields a conjunction of negations.',
  },
  {
    id: 'implication-equiv-law',
    name: 'Material Implication Law',
    category: 'Classic Laws',
    expression: '(p → q) ↔ (¬p ∨ q)',
    description: 'Foundational conditional equivalence: p implies q is identical to (not p or q).',
  },
  {
    id: 'contrapositive-law',
    name: 'Law of Contrapositive',
    category: 'Classic Laws',
    expression: '(p → q) ↔ (¬q → ¬p)',
    description: 'Fundamental equivalence utilized in mathematical indirect proofs.',
  },
  {
    id: 'distributive-and-law',
    name: 'Distributive Law (AND over OR)',
    category: 'Classic Laws',
    expression: '(p ∧ (q ∨ r)) ↔ ((p ∧ q) ∨ (p ∧ r))',
    description: 'Distribution of conjunction across disjunction (8 rows, all True).',
  },
  {
    id: 'distributive-or-law',
    name: 'Distributive Law (OR over AND)',
    category: 'Classic Laws',
    expression: '(p ∨ (q ∧ r)) ↔ ((p ∨ q) ∧ (p ∨ r))',
    description: 'Distribution of disjunction across conjunction.',
  },
  {
    id: 'absorption-law',
    name: 'Absorption Law',
    category: 'Classic Laws',
    expression: '(p ∨ (p ∧ q)) ↔ p',
    description: 'Proving p absorbs the nested (p ∧ q) conjunction.',
  },
  {
    id: 'exportation-law',
    name: 'Law of Exportation',
    category: 'Classic Laws',
    expression: '((p ∧ q) → r) ↔ (p → (q → r))',
    description: 'Logical Currying: conjoined premises leading to r is equivalent to sequential implications.',
  },
  {
    id: 'biconditional-equiv-law',
    name: 'Biconditional Equivalence',
    category: 'Classic Laws',
    expression: '(p ↔ q) ↔ ((p → q) ∧ (q → p))',
    description: 'Proving equivalence is identical to mutual two-way implication.',
  },
  {
    id: 'modus-ponens',
    name: 'Modus Ponens Tautology',
    category: 'Inference Rules',
    expression: '((p → q) ∧ p) → q',
    description: 'Law of detachment: if hypothesis holds, conclusion must hold.',
  },
  {
    id: 'modus-tollens',
    name: 'Modus Tollens Tautology',
    category: 'Inference Rules',
    expression: '((p → q) ∧ ¬q) → ¬p',
    description: 'Denying the consequent: foundational rule of deductive inference.',
  },
  {
    id: 'hypothetical-syllogism',
    name: 'Hypothetical Syllogism',
    category: 'Inference Rules',
    expression: '((p → q) ∧ (q → r)) → (p → r)',
    description: 'Chain rule: transitivity of implication across 3 variables.',
  },
  {
    id: 'disjunctive-syllogism',
    name: 'Disjunctive Syllogism',
    category: 'Inference Rules',
    expression: '((p ∨ q) ∧ ¬p) → q',
    description: 'Elimination of alternatives: if p is false, q must be true.',
  },
  {
    id: 'xor-def',
    name: 'Exclusive OR (XOR) Construction',
    category: 'Compound Expressions',
    expression: '(p ⊕ q) ↔ ((p ∨ q) ∧ ¬(p ∧ q))',
    description: 'Constructing XOR from basic AND, OR, NOT operations.',
  },
];
