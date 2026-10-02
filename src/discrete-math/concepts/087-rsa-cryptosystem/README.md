# Concept 087: Rsa Cryptosystem

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Rsa Cryptosystem** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

RSA is an asymmetric cryptographic algorithm relying on the practical difficulty of factoring the product of two large prime numbers $n = p \cdot q$.

### 1.2 Formal Semantics & Theorems
1. **Key Inversion**: $e \cdot d \equiv 1 \pmod{\phi(n)}$ ensures that $(m^e)^d \equiv m \pmod n$ by Euler's Theorem.
2. **Trapdoor One-Way Function**: Exponentiation modulo $n$ is easy, but computing discrete logarithm or factoring $n$ without $p, q$ is computationally infeasible.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Rsa Cryptosystem.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **TLS / HTTPS Handshakes**: Securing Internet session keys.
- **Digital Signatures**: Non-repudiation and document integrity (sign with $d$, verify with $e$).
- **Public Key Infrastructure (PKI)**: Identity certificates.
