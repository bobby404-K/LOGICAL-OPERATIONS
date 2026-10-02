# Concept 090: Combinations

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Combinations** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

A combination is a selection of elements from a collection such that the order of selection does not matter. Denoted $C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}$.

### 1.2 Formal Semantics & Theorems
1. **Symmetry**: $\binom{n}{k} = \binom{n}{n-k}$.
2. **Pascal's Identity**: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Combinations.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **Probability & Statistics**: Hypergeometric and binomial distributions.
- **Graph Clique / Edge Counting**: Total possible edges in an undirected graph on $n$ vertices is $\binom{n}{2}$.
- **Feature Selection in ML**: Subsets of predictive features.
