# Concept 005: Logical Equivalence Laws

## 1. Mathematical Formalism

### 1.1 Definition of Logical Equivalence
Two propositional formulas $\phi$ and $\psi$ over atomic variables $\mathcal{V}_n$ are **logically equivalent** (denoted $\phi \equiv \psi$ or $\phi \Leftrightarrow \psi$) if and only if they evaluate to identical truth values under every possible truth valuation $v \in \mathbb{B}^n$:
$$\phi \equiv \psi \iff \forall v \in \mathbb{B}^n, \quad \hat{v}(\phi) = \hat{v}(\psi)$$

Equivalently, by the deduction theorem and biconditional semantics:
$$\phi \equiv \psi \iff \models (\phi \leftrightarrow \psi)$$
Two propositions are logically equivalent if and only if their biconditional compound is a **tautology**.

### 1.2 Canonical Catalog of Equivalence Laws

| Law Name | Disjunctive / Dual 1 | Conjunctive / Dual 2 |
| :--- | :--- | :--- |
| **Identity** | $p \lor \bot \equiv p$ | $p \land \top \equiv p$ |
| **Domination** | $p \lor \top \equiv \top$ | $p \land \bot \equiv \bot$ |
| **Idempotent** | $p \lor p \equiv p$ | $p \land p \equiv p$ |
| **Double Negation** | $\neg(\neg p) \equiv p$ | — |
| **Commutative** | $p \lor q \equiv q \lor p$ | $p \land q \equiv q \land p$ |
| **Associative** | $(p \lor q) \lor r \equiv p \lor (q \lor r)$ | $(p \land q) \land r \equiv p \land (q \land r)$ |
| **Distributive** | $p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$ | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$ |
| **De Morgan's** | $\neg(p \land q) \equiv \neg p \lor \neg q$ | $\neg(p \lor q) \equiv \neg p \land \neg q$ |
| **Absorption** | $p \lor (p \land q) \equiv p$ | $p \land (p \lor q) \equiv p$ |
| **Complement / Negation** | $p \lor \neg p \equiv \top$ | $p \land \neg p \equiv \bot$ |
| **Material Implication** | $p \to q \equiv \neg p \lor q$ | $\neg(p \to q) \equiv p \land \neg q$ |
| **Contraposition** | $p \to q \equiv \neg q \to \neg p$ | — |
| **Biconditional Equivalence**| $p \leftrightarrow q \equiv (p \to q) \land (q \to p)$ | $p \leftrightarrow q \equiv (p \land q) \lor (\neg p \land \neg q)$ |

### 1.3 Principle of Substitution (Replacement Theorem)
Let $\theta$ be a formula containing $\phi$ as a sub-formula: $\theta = \theta[\phi]$.
If $\phi \equiv \psi$, then replacing any occurrence of $\phi$ in $\theta$ with $\psi$ yields an equivalent formula:
$$\phi \equiv \psi \implies \theta[\phi] \equiv \theta[\psi]$$
This theorem forms the theoretical foundation of algebraic equational reasoning and algebraic simplification in computer science.

---

## 2. Computational Architecture

The TypeScript module [`index.ts`](./index.ts) provides:
- `areLogicallyEquivalent(exprA: string, exprB: string)`: Exhaustive valuation verifier testing $\models A \leftrightarrow B$, returning counterexamples if not equivalent.
- `EQUIVALENCE_LAWS`: Built-in catalog of standard laws with symbolic expressions, definitions, and verification functions.
- `verifyLaw(lawId: string)`: Automated theorem prover checking that the given law is an algebraic tautology.
- `verifyProofStep(before: string, after: string, expectedLaw?: string)`: Validates whether a single rewrite step preserves equivalence.

---

## 3. Real-World Applications
- **Query Optimization in Relational Databases (SQL)**: Optimizing Boolean WHERE clauses (e.g. converting `NOT (A AND B)` into `NOT A OR NOT B` to leverage index scans).
- **Circuit Synthesis**: Applying De Morgan and Distributive laws to minimize transistor counts in VLSI layouts.
- **Formal Proof Assistants**: Equational reasoning engines in Coq, Isabelle/HOL, and Lean.
