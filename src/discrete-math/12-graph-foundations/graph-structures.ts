// Graph Representation & Bipartite Graph Tester

export class UndirectedGraph {
  public adjList: Map<number, Set<number>> = new Map();

  public addEdge(u: number, v: number): void {
    if (!this.adjList.has(u)) this.adjList.set(u, new Set());
    if (!this.adjList.has(v)) this.adjList.set(v, new Set());
    this.adjList.get(u)!.add(v);
    this.adjList.get(v)!.add(u);
  }

  public isBipartite(): boolean {
    const color: Map<number, number> = new Map();

    for (const startNode of this.adjList.keys()) {
      if (color.has(startNode)) continue;

      const queue: number[] = [startNode];
      color.set(startNode, 0);

      while (queue.length > 0) {
        const u = queue.shift()!;
        const c = color.get(u)!;

        for (const neighbor of this.adjList.get(u) || []) {
          if (!color.has(neighbor)) {
            color.set(neighbor, 1 - c);
            queue.push(neighbor);
          } else if (color.get(neighbor) === c) {
            return false; // Found odd cycle
          }
        }
      }
    }

    return true;
  }
}
