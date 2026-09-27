// Eulerian Circuit Detector & Path Finder

export class ConnectivityGraph {
  public adjList: Map<number, number[]> = new Map();

  public addEdge(u: number, v: number): void {
    if (!this.adjList.has(u)) this.adjList.set(u, []);
    if (!this.adjList.has(v)) this.adjList.set(v, []);
    this.adjList.get(u)!.push(v);
    this.adjList.get(v)!.push(u);
  }

  public hasEulerianCircuit(): boolean {
    for (const [_, neighbors] of this.adjList.entries()) {
      if (neighbors.length % 2 !== 0) return false;
    }
    return true;
  }

  public hasEulerianPath(): boolean {
    let oddCount = 0;
    for (const [_, neighbors] of this.adjList.entries()) {
      if (neighbors.length % 2 !== 0) oddCount++;
    }
    return oddCount === 0 || oddCount === 2;
  }
}
