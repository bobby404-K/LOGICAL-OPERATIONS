# Concept 004: Tautologies, Contradictions, and Contingencies

## 1. Mathematical Formalism

### 1.1 Semantic Classification of Propositional Formulas
Let $\phi \in \text{WFF}$ be a propositional formula over atomic variables $\mathcal{V}_n$.
Let $\mathcal{M}(\phi) = \{v \in \mathbb{B}^n \mid \hat{v}(\phi) = 1\}$ denote the set of **models** (satisfying valuations) of $\phi$.

Every formula $\phi$ belongs to exactly one of three mutually exclusive semantic classes:

1. **Tautology (Universally Valid / Logical Truth)**:
   A formula $\phi$ is a tautology (denoted $\models \phi$) if it evaluates to true under **all** $2^n$ valuations:
   $$\forall v \in \mathbb{B}^n, \quad \hat{v}(\phi) = 1 \iff |\mathcal{M}(\phi)| = 2^n$$
   *Examples*: $p \lor \neg p$ (Law of Excluded Middle), $p \to p$, $(p \land (p \to q)) \to q$ (Modus Ponens).

2. **Contradiction (Absurdity / Unsatisfiable)**:
   A formula $\phi$ is a contradiction (denoted $\phi \equiv \bot$) if it evaluates to false under **all** $2^n$ valuations:
   $$\forall v \in \mathbb{B}^n, \quad \hat{v}(\phi) = 0 \iff |\mathcal{M}(\phi)| = 0$$
   *Examples*: $p \land \neg p$ (Principle of Non-Contradiction), $(p \leftrightarrow \neg p)$.

3. **Contingency (Synthetic Formula)**:
   A formula $\phi$ is a contingency if it is true under at least one valuation and false under at least one valuation:
   $$0 < |\mathcal{M}(\phi)| < 2^n$$
   *Examples*: $p \land q$, $p \lor q$, $p \to q$.

### 1.2 Duality and Negation Relationships
- $\phi$ is a **tautology** $\iff$ $\neg \phi$ is a **contradiction**.
- $\phi$ is **satisfiable** $\iff$ $\phi$ is NOT a contradiction ($|\mathcal{M}(\phi)| \ge 1$).
- $\phi$ is **falsifiable** $\iff$ $\phi$ is NOT a tautology ($|\mathcal{M}(\phi)| < 2^n$).

### 1.3 Model Counting and SAT Connection
The ratio $\frac{|\mathcal{M}(\phi)|}{2^n}$ defines the **satisfaction density** (or Boolean probability $\Pr(\phi)$ under uniform distribution):
- $\Pr(\text{Tautology}) = 1$
- $\Pr(\text{Contradiction}) = 0$
- $0 < \Pr(\text{Contingency}) < 1$

---

## 2. Computational Architecture

The TypeScript module [`index.ts`](./index.ts) provides:
- `classifyFormula(expression: string)`: Determines whether a formula is a `TAUTOLOGY`, `CONTRADICTION`, or `CONTINGENCY`, returning satisfying models and counterexamples.
- `isTautology(expression: string)`: Boolean helper testing validity.
- `isContradiction(expression: string)`: Boolean helper testing unsatisfiability.
- `isSatisfiable(expression: string)`: Tests whether at least one satisfying valuation exists.
- `calculateSatisfactionDensity(expression: string)`: Returns fractional model density $\frac{|\mathcal{M}|}{2^n}$.

---

## 3. Real-World Applications
- **Automated Theorem Proving**: In proof-by-refutation, proving that premises $\Gamma \models \psi$ is equivalent to proving that $\Gamma \land \neg \psi$ is a contradiction.
- **Compiler Dead Code Elimination**: When an `if (condition)` contains a contradiction, dead branches are safely pruned by the optimizer.
- **Software Safety Verification**: Proving that an assertion invariant is a tautology ensures that the program cannot enter an error state.
