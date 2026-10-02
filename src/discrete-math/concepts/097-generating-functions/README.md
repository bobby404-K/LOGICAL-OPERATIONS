# Concept 097: Generating Functions

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Generating Functions** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

An ordinary generating function (OGF) represents a sequence $(a_n)$ as the formal power series $G(x) = \sum_{n=0}^\infty a_n x^n$.

### 1.2 Formal Semantics & Theorems
1. **Convolution Property**: Multiplication of generating functions corresponds to sequence convolution: $(A(x)B(x))_n = \sum_{k=0}^n a_k b_{n-k}$.
2. **Closed Form Rational Representation**: Geometric series $\frac{1}{1 - rx} = \sum_{n=0}^\infty r^n x^n$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Generating Functions.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **Counting Integer Partitions**: Euler generating function for partitions $\prod_{k=1}^\infty \frac{1}{1 - x^k}$.
- **Change-Making Coin Combinations**: Coefficient extraction for currency denominations.
- **Probabilistic Generating Functions (PGF)**: Moments and variance of discrete distributions.
