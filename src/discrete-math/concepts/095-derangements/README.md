# Concept 095: Derangements

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Derangements** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

A derangement is a permutation of elements of a set such that no element appears in its original position (a permutation with zero fixed points). Denoted $!n$ or $D_n$.

### 1.2 Formal Semantics & Theorems
1. **Recurrence Relation**: $!n = (n - 1)(!(n - 1) + !(n - 2))$ for $n \ge 2$ with base cases $!0 = 1, !1 = 0$.
2. **Explicit Formula**: $!n = n! \sum_{k=0}^n \frac{(-1)^k}{k!} = \left[\frac{n!}{e}\right]$.
3. **Asymptotic Ratio**: $\lim_{n \to \infty} \frac{!n}{n!} = \frac{1}{e} \approx 0.367879$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Derangements.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **Secret Santa / Hat-Check Problem**: Probability that nobody draws their own name.
- **Cryptographic S-Boxes**: Ensuring block cipher substitution tables have no identity mappings.
- **Statistical Randomization Tests**: Validating permutation test randomness.
