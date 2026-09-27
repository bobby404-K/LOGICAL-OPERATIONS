# Planar Graphs, Euler's Characteristic & Graph Coloring

## 1. Planar Graphs & Euler's Formula
A graph is planar if it can be drawn in the plane without edge crossings.
**Euler's Planar Formula**: For any connected planar graph:
$$V - E + F = 2$$
**Inequalities for Simple Planar Graphs**:
- $E \le 3V - 6$ (for $V \ge 3$)
- $E \le 2V - 4$ (for bipartite / triangle-free planar graphs)
- **Kuratowski's Theorem**: A graph is planar iff it contains no subgraph homeomorphic to $K_5$ or $K_{3,3}$.

---

## 2. Graph Coloring & The Four Color Theorem
- Chromatic Number $\chi(G)$: Minimum colors needed so no two adjacent vertices share the same color.
- **The Four Color Theorem**: Every planar graph can be colored with at most 4 colors: $\chi(G) \le 4$.
