# Concept 084: Chinese Remainder Theorem

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Chinese Remainder Theorem** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

Let $m_1, m_2, \dots, m_k$ be pairwise coprime positive integers. Then the system of congruences $x \equiv a_i \pmod{m_i}$ has a unique solution modulo $M = \prod_{i=1}^k m_i$.

### 1.2 Formal Semantics & Theorems
1. **Existence & Uniqueness**: $x = \sum_{i=1}^k a_i M_i y_i \pmod M$, where $M_i = M / m_i$ and $M_i y_i \equiv 1 \pmod{m_i}$.
2. **Isomorphism**: $\mathbb{Z}/M\mathbb{Z} \cong \prod_{i=1}^k \mathbb{Z}/m_i\mathbb{Z}$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Chinese Remainder Theorem.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **High-Precision Multi-Precision Arithmetic**: Operating on huge integers across residue number systems (RNS).
- **RSA Decryption Acceleration**: Garner's algorithm using CRT splits decryption into $\pmod p$ and $\pmod q$.
- **Fourier Transforms**: Good-Thomas FFT algorithm.
