// Kruskal's Minimum Spanning Tree Algorithm with Disjoint Set Union

export interface Edge {
  u: number;
  v: number;
  weight: number;
}

export class DSU {
  private parent: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  public find(x: number): number {
    if (this.parent[x] === x) return x;
    return (this.parent[x] = this.find(this.parent[x])); // Path compression
  }

  public union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;
    this.parent[rootX] = rootY;
    return true;
  }
}

export function kruskalMST(numVertices: number, edges: Edge[]): { mst: Edge[]; totalWeight: number } {
  edges.sort((a, b) => a.weight - b.weight);
  const dsu = new DSU(numVertices);
  const mst: Edge[] = [];
  let totalWeight = 0;

  for (const edge of edges) {
    if (dsu.union(edge.u, edge.v)) {
      mst.push(edge);
      totalWeight += edge.weight;
      if (mst.length === numVertices - 1) break;
    }
  }

  return { mst, totalWeight };
}
