# Graph Theory Foundations & Structural Properties

## 1. Graph Definitions
A graph $G = (V, E)$ consists of vertices $V$ and edges $E$.
### The Handshaking Lemma
For any undirected graph $G = (V, E)$:
$$\sum_{v \in V} \deg(v) = 2 |E|$$
**Corollary**: An undirected graph has an even number of vertices with odd degrees.

---

## 2. Bipartite Graphs
A graph is **bipartite** iff its vertex set can be partitioned into two disjoint sets $V_1, V_2$ such that every edge connects a vertex in $V_1$ to one in $V_2$.
**Theorem**: A graph is bipartite if and only if it contains no odd-length cycles.
