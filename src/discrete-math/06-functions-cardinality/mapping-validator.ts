// Executable Finite Function and Mapping Analyzer

export class FunctionAnalyzer<A, B> {
  private domain: A[];
  private codomain: Set<B>;
  private mapping: Map<A, B>;

  constructor(domain: A[], codomain: B[], mapping: Array<[A, B]>) {
    this.domain = domain;
    this.codomain = new Set(codomain);
    this.mapping = new Map(mapping);
  }

  public isInjective(): boolean {
    const seen = new Set<B>();
    for (const x of this.domain) {
      const y = this.mapping.get(x)!;
      if (seen.has(y)) return false;
      seen.add(y);
    }
    return true;
  }

  public isSurjective(): boolean {
    const image = new Set<B>();
    for (const x of this.domain) {
      const y = this.mapping.get(x)!;
      image.add(y);
    }
    return image.size === this.codomain.size;
  }

  public isBijective(): boolean {
    return this.isInjective() && this.isSurjective();
  }

  public getInverse(): Map<B, A> | null {
    if (!this.isBijective()) return null;
    const inv = new Map<B, A>();
    for (const [x, y] of this.mapping.entries()) {
      inv.set(y, x);
    }
    return inv;
  }
}
