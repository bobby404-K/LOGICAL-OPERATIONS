# Concept 099: Eulerian And Hamiltonian Graphs

## 1. Mathematical Formalism

### 1.1 Definition & Axiomatic Foundation
In discrete mathematics and mathematical logic, **Eulerian And Hamiltonian Graphs** forms an essential theoretical construct.
$$\mathcal{L}_{\text{concept}} = \langle \Sigma, \mathcal{R}, \models \rangle$$

An Eulerian trail/circuit visits every edge of a graph exactly once. A Hamiltonian path/cycle visits every vertex of a graph exactly once.

### 1.2 Formal Semantics & Theorems
1. **Euler's Theorem**: A connected graph has an Eulerian circuit iff every vertex has even degree, and an Eulerian trail iff exactly two vertices have odd degree.
2. **Dirac's Theorem**: A simple graph with $n \ge 3$ vertices has a Hamiltonian cycle if $\deg(v) \ge n/2$ for all $v$.
3. **Complexity Contrast**: Eulerian cycle detection is in P (polynomial time), while Hamiltonian cycle is NP-complete.

### 1.3 Algorithmic Invariants
1. Deterministic evaluation in finite time complexity $\mathcal{O}(2^n)$ or polynomial time where reduction is tractable.
2. Complete soundness and refutation completeness over propositional and relational structures.

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Core typed evaluation functions and propositional valuation solver.
- Domain-specific computational algorithms for Eulerian And Hamiltonian Graphs.
- Invariant inspection and formal equivalence testing.

---

## 3. Real-World Applications
- **DNA Fragment Assembly**: De Bruijn graphs and Eulerian reconstruction of genomes.
- **Logistics & Street Sweeping**: Chinese Postman Problem (Eulerian minimum weight tour).
- **Robotic Drilling Paths**: Visiting discrete hole coordinates on circuit boards (Hamiltonian cycle).
