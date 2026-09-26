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
    name: "Prompt Example (5 variables)",
    category: 'Compound Expressions',
    expression: '(p ∧ r ∧ s) ∨ (q ∧ t) ∨ (r ∧ ¬t)',
    description: 'Complex 5-variable disjunction from standard discrete math problem.',
  },
  {
    id: 'demorgan-1',
    name: "De Morgan's Law (AND)",
    category: 'Classic Laws',
    expression: '¬(p ∧ q)',
    description: 'The negation of a conjunction: explore its equivalence to ¬p ∨ ¬q.',
  },
  {
    id: 'demorgan-2',
    name: "De Morgan's Law (OR)",
    category: 'Classic Laws',
    expression: '¬(p ∨ q)',
    description: 'The negation of a disjunction: explore its equivalence to ¬p ∧ ¬q.',
  },
  {
    id: 'implication-equiv',
    name: 'Implication Equivalence',
    category: 'Classic Laws',
    expression: 'p → q',
    description: 'Material implication: verify why it is false only when p is true and q is false.',
  },
  {
    id: 'contrapositive',
    name: 'Law of Contrapositive',
    category: 'Classic Laws',
    expression: '(p → q) ↔ (¬q → ¬p)',
    description: 'Fundamental equivalence used in mathematical proofs.',
  },
  {
    id: 'modus-ponens',
    name: 'Modus Ponens',
    category: 'Inference Rules',
    expression: '((p → q) ∧ p) → q',
    description: 'Famous rule of inference: proving this statement is a tautology (always True).',
  },
  {
    id: 'modus-tollens',
    name: 'Modus Tollens',
    category: 'Inference Rules',
    expression: '((p → q) ∧ ¬q) → ¬p',
    description: 'Denying the consequent: also a foundational tautology in logic.',
  },
  {
    id: 'distributive',
    name: 'Distributive Law',
    category: 'Classic Laws',
    expression: 'p ∧ (q ∨ r)',
    description: 'Explore distribution of AND over OR with 3 variables.',
  },
  {
    id: 'xor-def',
    name: 'Exclusive OR (XOR)',
    category: 'Compound Expressions',
    expression: '(p ∨ q) ∧ ¬(p ∧ q)',
    description: 'Construct XOR from fundamental AND, OR, and NOT connectives.',
  },
];
