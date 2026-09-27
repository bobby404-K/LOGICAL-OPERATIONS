# Trees, Spanning Trees & Minimum Spanning Tree (MST) Algorithms

## 1. Characterizations of Trees
An undirected graph $T = (V, E)$ is a tree iff any of the following equivalent conditions hold:
1. $T$ is connected and has no simple cycles.
2. $T$ is connected and $|E| = |V| - 1$.
3. $T$ is acyclic and $|E| = |V| - 1$.
4. There is a unique simple path between any pair of vertices.

---

## 2. Minimum Spanning Tree (MST) Algorithms
- **Kruskal's Algorithm**: Greedily selects edges with minimum weight that do not form a cycle, using Disjoint-Set Union (DSU). Time: $O(E \log E)$.
- **Prim's Algorithm**: Grows a single tree outward from an initial vertex by choosing the minimum-weight cut edge. Time: $O(E + V \log V)$ with a Fibonacci heap.
