# Concept 094: Inclusion Exclusion Principle

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Inclusion Exclusion Principle** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

The Principle of Inclusion-Exclusion (PIE) computes the cardinality of the union of finite sets by alternatingly adding and subtracting intersections of all possible subset combinations.

### 1.2 Formal Semantics & Theorems
1. **General Union Formula**: $\left|\bigcup_{i=1}^n A_i\right| = \sum_{k=1}^n (-1)^{k-1} \sum_{1 \le i_1 < \dots < i_k \le n} \left|\bigcap_{j=1}^k A_{i_j}\right|$.
2. **Complementary Intersection**: $\left|\bigcap_{i=1}^n A_i^c\right| = |U| - \left|\bigcup_{i=1}^n A_i\right|$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Inclusion Exclusion Principle.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **Surjective Function Counting**: Determining the number of onto functions $f: A \to B$.
- **Derangement Derivation**: Counting permutations with zero fixed points.
- **Network Reliability**: Evaluating end-to-end packet delivery probability across overlapping redundant links.
