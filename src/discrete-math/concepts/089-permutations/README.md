# Concept 089: Permutations

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Permutations** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

A permutation is an ordered arrangement of elements from a set. The number of $k$-permutations of an $n$-element set is denoted $P(n, k) = \frac{n!}{(n-k)!}$.

### 1.2 Formal Semantics & Theorems
1. **Total Orderings**: $P(n, n) = n!$.
2. **Multiset Permutations**: $\frac{n!}{n_1! n_2! \dots n_k!}$ for items with repetitions.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Permutations.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **Traveling Salesperson Problem (TSP)**: Evaluating permutations of tour visits.
- **Sorting Network Lower Bounds**: Decision trees require $\Omega(n \log n)$ comparisons because there are $n!$ leaves.
- **Job Scheduling & Pipelines**: Optimizing task execution sequences.
