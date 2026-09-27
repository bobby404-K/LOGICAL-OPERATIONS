// Binary Relation Analyzer & Warshall's Transitive Closure Algorithm

export class RelationAnalyzer {
  private size: number;
  private matrix: boolean[][];

  constructor(size: number, pairs: Array<[number, number]>) {
    this.size = size;
    this.matrix = Array.from({ length: size }, () => Array(size).fill(false));
    for (const [u, v] of pairs) {
      if (u < size && v < size) this.matrix[u][v] = true;
    }
  }

  public isReflexive(): boolean {
    for (let i = 0; i < this.size; i++) {
      if (!this.matrix[i][i]) return false;
    }
    return true;
  }

  public isSymmetric(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.matrix[i][j] !== this.matrix[j][i]) return false;
      }
    }
    return true;
  }

  public isAntisymmetric(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (i !== j && this.matrix[i][j] && this.matrix[j][i]) return false;
      }
    }
    return true;
  }

  public isTransitive(): boolean {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.matrix[i][j]) {
          for (let k = 0; k < this.size; k++) {
            if (this.matrix[j][k] && !this.matrix[i][k]) return false;
          }
        }
      }
    }
    return true;
  }

  // Warshall's Algorithm: O(n^3) Transitive Closure
  public transitiveClosure(): boolean[][] {
    const W = this.matrix.map((row) => [...row]);
    for (let k = 0; k < this.size; k++) {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          W[i][j] = W[i][j] || (W[i][k] && W[k][j]);
        }
      }
    }
    return W;
  }
}
