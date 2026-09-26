# Propositional Logic Foundations & Satisfiability (SAT)

## 1. Abstract & Formal Definitions
Propositional logic (zeroth-order logic) deals with propositions—declarative statements that are either **True** ($1$) or **False** ($0$), but not both.

### Formal Syntax
Let $\mathcal{V} = \{p, q, r, s, \dots\}$ be a countable set of propositional variables.
The set of well-formed propositional formulas $\mathcal{L}$ is defined inductively:
1. Every variable $p \in \mathcal{V}$ is a formula (an atomic formula).
2. If $\phi$ is a formula, then $\neg \phi$ (negation) is a formula.
3. If $\phi, \psi$ are formulas, then $(\phi \land \psi)$ (conjunction), $(\phi \lor \psi)$ (disjunction), $(\phi \to \psi)$ (implication), and $(\phi \leftrightarrow \psi)$ (biconditional) are formulas.

### Semantics & Valuation
A truth valuation is a function $v: \mathcal{V} \to \{0, 1\}$. It extends homomorphically to $\bar{v}: \mathcal{L} \to \{0, 1\}$:
- $\bar{v}(\neg \phi) = 1 - \bar{v}(\phi)$
- $\bar{v}(\phi \land \psi) = \min(\bar{v}(\phi), \bar{v}(\psi))$
- $\bar{v}(\phi \lor \psi) = \max(\bar{v}(\phi), \bar{v}(\psi))$
- $\bar{v}(\phi \to \psi) = \max(1 - \bar{v}(\phi), \bar{v}(\psi))$
- $\bar{v}(\phi \leftrightarrow \psi) = 1$ if $\bar{v}(\phi) = \bar{v}(\psi)$, else $0$

---

## 2. Normal Forms
Every propositional formula can be transformed into equivalent standard normal forms:
- **Disjunctive Normal Form (DNF)**: Disjunction of conjunctions of literals: $\bigvee_{i} \bigwedge_{j} L_{i,j}$
- **Conjunctive Normal Form (CNF)**: Conjunction of disjunctions of literals (clauses): $\bigwedge_{i} \bigvee_{j} L_{i,j}$

### Tseitin Transformation
Converting arbitrary formulas to CNF via truth tables or distributivity can cause an exponential ($2^n$) clause explosion. The **Tseitin Transformation** introduces auxiliary variables for every sub-expression, yielding an equisatisfiable CNF formula in linear $O(n)$ time and size.

---

## 3. The Boolean Satisfiability Problem (SAT) & DPLL Algorithm
A formula $\phi$ is satisfiable if there exists a valuation $v$ such that $\bar{v}(\phi) = 1$.
By the **Cook-Levin Theorem (1971)**, SAT is NP-complete.

### The Davis-Putnam-Logemann-Loveland (DPLL) Algorithm
DPLL is a backtracking search algorithm for CNF satisfiability:
1. **Unit Propagation**: If a clause contains only a single unassigned literal $L$ (a unit clause), $L$ must be assigned True.
2. **Pure Literal Elimination**: If a variable occurs with only one polarity across all unresolved clauses, assign it to satisfy all those clauses.
3. **Backtracking / Splitting**: Choose an unassigned variable $x$, branch on $x = \text{True}$; if unsatisfiable, backtrack and try $x = \text{False}$.

---

## 4. Real-World Applications
1. **Hardware Verification**: Equivalence checking of microprocessors and arithmetic logic units (ALUs).
2. **Automated Theorem Proving**: SMT solvers (Z3, CVC5) built on SAT backbones.
3. **Software Package Dependency Resolution**: npm, Debian APT, and Conda package dependency resolution are solved as SAT instances.
