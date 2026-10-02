# Concept 085: Fermats Little Theorem

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Fermats Little Theorem** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

If $p$ is a prime number and $a$ is an integer such that $\gcd(a, p) = 1$, then $a^{p-1} \equiv 1 \pmod p$. Equivalently, for any integer $a$, $a^p \equiv a \pmod p$.

### 1.2 Formal Semantics & Theorems
1. **Primality Test Filter**: If $a^{n-1} \not\equiv 1 \pmod n$ for some $1 < a < n$, then $n$ is composite.
2. **Modular Inverses for Primes**: $a^{-1} \equiv a^{p-2} \pmod p$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Fermats Little Theorem.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **Fermat Primality Test**: Rapid screening for prime candidates.
- **Fast Modular Inversion**: Direct power computation without extended Euclidean steps.
- **Cryptographic Diffie-Hellman Key Exchange**: Group theory foundation over finite fields.
