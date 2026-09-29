export interface ConceptMeta {
  id: string; // e.g. "001"
  slug: string; // e.g. "001-propositional-syntax"
  title: string;
  category: string;
  description: string;
  isImplemented: boolean;
  issueNumber?: number;
}

export const CONCEPTS_CATALOG: ConceptMeta[] = [
  {
    id: '001',
    slug: '001-propositional-syntax',
    title: 'Propositional Syntax & WFF',
    category: 'Propositional Logic',
    description: 'Grammar rules, atomic propositions, syntax trees, parentheses nesting, and operator precedence.',
    isImplemented: true,
    issueNumber: 227
  },
  {
    id: '002',
    slug: '002-truth-functional-connectives',
    title: 'Truth-Functional Connectives',
    category: 'Propositional Logic',
    description: 'Unary and binary truth functions, algebraic properties, and Emil Post functional completeness.',
    isImplemented: true,
    issueNumber: 228
  },
  {
    id: '003',
    slug: '003-truth-table-construction',
    title: 'Truth Table Construction',
    category: 'Propositional Logic',
    description: 'Systematic 2^n lexicographic valuation tables, AST dependency decomposition, and intermediate step evaluation.',
    isImplemented: true,
    issueNumber: 229
  },
  {
    id: '004',
    slug: '004-tautologies-and-contradictions',
    title: 'Tautologies & Contradictions',
    category: 'Propositional Logic',
    description: 'Semantic classification of formulas into tautologies, contradictions, and contingencies with model counting.',
    isImplemented: true,
    issueNumber: 230
  },
  {
    id: '005',
    slug: '005-logical-equivalence-laws',
    title: 'Logical Equivalence Laws',
    category: 'Propositional Logic',
    description: 'Equational semantic verification (A ≡ B), algebraic law catalog, countermodels, and proof chain validation.',
    isImplemented: true,
    issueNumber: 231
  },
  {
    id: '006',
    slug: '006-demorgan-laws',
    title: "De Morgan's Laws",
    category: 'Propositional Logic',
    description: 'Dualities distributing negation across conjunction and disjunction: ¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q.',
    isImplemented: false,
    issueNumber: 232
  },
  {
    id: '007',
    slug: '007-distributive-laws',
    title: 'Distributive Laws',
    category: 'Propositional Logic',
    description: 'Distributivity of AND over OR and OR over AND in Boolean algebra.',
    isImplemented: false,
    issueNumber: 233
  },
  {
    id: '008',
    slug: '008-conditional-statements',
    title: 'Conditional Statements',
    category: 'Propositional Logic',
    description: 'Material implication semantics, vacuous truth, antecedent, consequent, and disjunctive normal forms.',
    isImplemented: false,
    issueNumber: 234
  },
  {
    id: '009',
    slug: '009-contrapositive-and-converse',
    title: 'Contrapositive & Converse',
    category: 'Propositional Logic',
    description: 'Valid contraposition (¬q → ¬p), converse error, inverse fallacy, and conditional relationships.',
    isImplemented: false,
    issueNumber: 235
  },
  {
    id: '010',
    slug: '010-biconditional-equivalences',
    title: 'Biconditional Equivalences',
    category: 'Propositional Logic',
    description: 'If-and-only-if bi-implication, dual truth conditions, and decomposition into mutual implications.',
    isImplemented: false,
    issueNumber: 236
  }
];
