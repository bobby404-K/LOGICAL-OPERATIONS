# Concept 001: Propositional Syntax

## 1. Mathematical Formalism

### 1.1 Alphabet and Formal Language
The formal language of propositional logic $\mathcal{L}_{\text{prop}}$ is defined over an alphabet $\Sigma$ comprising three disjoint sets:
1. **Propositional Variables (Atoms)**: A countable set of symbols $\mathcal{V} = \{p, q, r, s, t, \dots\}$ representing primitive declarative propositions with deterministic truth values in $\mathbb{B} = \{0, 1\}$.
2. **Logical Connectives**: The unary operator negation $\neg$, and binary operators conjunction $\land$, disjunction $\lor$, implication $\to$, biconditional $\leftrightarrow$, exclusive-or $\oplus$, NAND $\uparrow$, and NOR $\downarrow$.
3. **Punctuation Symbols**: Left and right parentheses $(, )$ enforcing disambiguation and tree hierarchy.

### 1.2 Inductive Definition of Well-Formed Formulas (WFF)
The set $\text{WFF}(\mathcal{L}_{\text{prop}})$ is the smallest set of strings over $\Sigma^*$ satisfying the following inductive rules:
- **Base Case (Atomic Clause)**: For every $v \in \mathcal{V}$, the string $v \in \text{WFF}$.
- **Inductive Step 1 (Unary Negation)**: If $\phi \in \text{WFF}$, then $(\neg \phi) \in \text{WFF}$.
- **Inductive Step 2 (Binary Composition)**: If $\phi, \psi \in \text{WFF}$ and $\circ \in \{\land, \lor, \to, \leftrightarrow, \oplus, \uparrow, \downarrow\}$, then $(\phi \circ \psi) \in \text{WFF}$.
- **Extremal Clause**: Nothing else is in $\text{WFF}$.

### 1.3 Operator Precedence & Disambiguation Convention
To minimize parentheses while preserving a unique Abstract Syntax Tree (AST), standard propositional grammar follows the descending precedence convention:
$$\neg \quad > \quad \land \quad > \quad \lor \quad > \quad \to \quad > \quad \leftrightarrow$$
- Unary $\neg$ binds tightest.
- Conjunction $\land$ precedes disjunction $\lor$.
- Implication $\to$ is right-associative: $p \to q \to r \equiv p \to (q \to r)$.
- Conjunction and disjunction are left-associative.

### 1.4 Structural Complexity Metrics
For any formula $\phi \in \text{WFF}$:
- **Syntactic Depth** $d(\phi)$:
  $$d(v) = 0 \quad (v \in \mathcal{V})$$
  $$d(\neg \psi) = 1 + d(\psi)$$
  $$d(\psi_1 \circ \psi_2) = 1 + \max(d(\psi_1), d(\psi_2))$$
- **Connective Count** $c(\phi)$: Total number of logical operators in the AST.

---

## 2. Computational Architecture

The TypeScript module [`index.ts`](./index.ts) provides:
- `validateWff(expression: string)`: Validates syntax, balanced parentheses, and builds the AST.
- `calculateFormulaDepth(ast: ASTNode)`: Computes structural formula tree height.
- `extractVariables(ast: ASTNode)`: Collects unique atomic propositions in canonical order.
- `countConnectives(ast: ASTNode)`: Counts unary and binary operator nodes.
- `formatWff(ast: ASTNode, options)`: Emits fully parenthesized or canonical minimal-bracket representations.

---

## 3. Real-World Applications
- **Hardware Verification**: Equivalence checking and gate synthesis in EDA (Electronic Design Automation) tools.
- **Formal Specifications**: Safety invariants in critical software (avionics, railway interlocking, smart contracts).
- **Automated Theorem Proving (ATP)**: Parsing mathematical statements into AST structures for SAT/SMT solvers.
