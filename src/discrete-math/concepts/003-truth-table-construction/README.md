# Concept 003: Truth Table Construction

## 1. Mathematical Formalism

### 1.1 Valuation Function
Let $\mathcal{V}_n = \{p_1, \dots, p_n\} \subseteq \mathcal{V}$ be the set of atomic variables occurring in formula $\phi$.
A **truth assignment (valuation)** is a mapping:
$$v: \mathcal{V}_n \to \mathbb{B}, \quad \text{where } \mathbb{B} = \{0, 1\}$$
There are exactly $2^n$ distinct valuations for $n$ propositional variables.

The valuation function extends homomorphically to all $\phi \in \text{WFF}$ via the semantic evaluation rule:
- $\hat{v}(p) = v(p)$ for $p \in \mathcal{V}_n$
- $\hat{v}(\neg \psi) = 1 - \hat{v}(\psi)$
- $\hat{v}(\psi_1 \circ \psi_2) = f_\circ(\hat{v}(\psi_1), \hat{v}(\psi_2))$

### 1.2 Canonical Ordering of Valuations
Rows in a formal truth table are ordered lexicographically descending from $11\dots1$ to $00\dots0$, matching binary numbers $2^n - 1$ down to $0$:
$$\text{Row } k \iff \text{binary representation of } (2^n - 1 - k)$$
For example, with $n=3$ ($p, q, r$):
$$\text{TTT}, \text{TTF}, \text{TFT}, \text{TFF}, \text{FTT}, \text{FTF}, \text{FFT}, \text{FFF}$$

### 1.3 Sub-Formula Decomposition (Topological Sorting)
To construct an instructional truth table with intermediate step columns:
1. Traverse the AST of $\phi$ in post-order (bottom-up).
2. Collect all distinct sub-formulas $\text{Sub}(\phi)$ such that every sub-expression precedes any parent expression depending on it:
$$\psi \in \text{Sub}(\chi) \implies \text{col}(\psi) < \text{col}(\chi)$$
3. The leftmost columns are the atomic propositions in alphabetical/canonical order.
4. Intermediate columns evaluate compound sub-formulas of increasing complexity.
5. The final column represents the main formula $\phi$.

---

## 2. Computational Architecture

The TypeScript module [`index.ts`](./index.ts) provides:
- `generateTruthAssignments(variables: VariableName[])`: Generates the $2^n$ valuation rows in canonical lexicographic order.
- `extractSubformulaColumns(ast: ASTNode)`: Extracts distinct non-atomic sub-formulas ordered by dependency depth.
- `constructTruthTable(expression: string)`: Computes the complete truth table structure including header metadata, row variable bindings, intermediate sub-formula columns, and final truth values.
- `formatTruthTableAscii(table)`: Renders formatted ASCII markdown tables for CLI or logging inspection.

---

## 3. Real-World Applications
- **Combinational Logic Synthesis**: Truth tables specify Boolean transfer functions before logic synthesis into Karnaugh maps or PLA (Programmable Logic Array) matrices.
- **Formal Verification**: Exhaustive state space exploration for small systems ($n \le 20$).
- **Pedagogical Tools**: Step-by-step verification helping students debug logical reasoning.
