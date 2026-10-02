# Concept 086: Euler Totient Function

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Euler Totient Function** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

Euler's totient function $\phi(n)$ counts the positive integers up to a given integer $n$ that are relatively prime to $n$: $\phi(n) = |\{k \in \mathbb{N} : 1 \le k \le n, \gcd(k, n) = 1\}|$.

### 1.2 Formal Semantics & Theorems
1. **Product Formula**: $\phi(n) = n \prod_{p | n} \left(1 - \frac{1}{p}\right)$ where $p$ ranges over distinct prime factors of $n$.
2. **Euler's Theorem**: $a^{\phi(n)} \equiv 1 \pmod n$ for all $\gcd(a, n) = 1$.
3. **Summation Property**: $\sum_{d | n} \phi(d) = n$.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Euler Totient Function.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **RSA Key Generation**: Determining the totient order of the multiplicative group $\mathbb{Z}_n^*$.
- **Group Theory**: Order of unit groups $(U(n), \cdot)$.
- **Cyclotomic Polynomials**: Degree of $n$-th cyclotomic polynomial is $\phi(n)$.
