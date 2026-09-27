# Graph Connectivity, Eulerian Paths & Hamiltonian Cycles

## 1. Eulerian Circuits & Paths
- **Eulerian Circuit**: A closed walk traversing every edge of $G$ exactly once.
- **Eulerian Path**: An open walk traversing every edge of $G$ exactly once.
**Euler's Theorem**:
- A connected undirected graph has an Eulerian circuit iff every vertex has an **even degree**.
- A connected undirected graph has an Eulerian path iff it has exactly **zero or two vertices of odd degree**.

---

## 2. Hamiltonian Cycles & Paths
- **Hamiltonian Cycle**: A closed cycle visiting every vertex of $G$ exactly once.
- **Dirac's Theorem**: If $n \ge 3$ and $\deg(v) \ge n/2$ for all $v$, $G$ is Hamiltonian.
- Determining whether an arbitrary graph is Hamiltonian is **NP-complete**.
