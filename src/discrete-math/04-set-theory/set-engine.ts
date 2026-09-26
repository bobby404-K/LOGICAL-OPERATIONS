// Executable Mathematical Set Theory Engine

export class MathSet<T> {
  private elements: Set<T>;

  constructor(elements: Iterable<T> = []) {
    this.elements = new Set(elements);
  }

  public size(): number {
    return this.elements.size;
  }

  public toArray(): T[] {
    return Array.from(this.elements);
  }

  public has(elem: T): boolean {
    return this.elements.has(elem);
  }

  public union(other: MathSet<T>): MathSet<T> {
    return new MathSet([...this.elements, ...other.elements]);
  }

  public intersect(other: MathSet<T>): MathSet<T> {
    const res = new Set<T>();
    for (const item of this.elements) {
      if (other.has(item)) res.add(item);
    }
    return new MathSet(res);
  }

  public difference(other: MathSet<T>): MathSet<T> {
    const res = new Set<T>();
    for (const item of this.elements) {
      if (!other.has(item)) res.add(item);
    }
    return new MathSet(res);
  }

  public symmetricDifference(other: MathSet<T>): MathSet<T> {
    return this.difference(other).union(other.difference(this));
  }

  public isSubsetOf(other: MathSet<T>): boolean {
    for (const item of this.elements) {
      if (!other.has(item)) return false;
    }
    return true;
  }

  public powerSet(): MathSet<T[]> {
    const arr = this.toArray();
    const total = 1 << arr.length;
    const powerSetResult: T[][] = [];

    for (let i = 0; i < total; i++) {
      const subset: T[] = [];
      for (let j = 0; j < arr.length; j++) {
        if ((i & (1 << j)) !== 0) {
          subset.push(arr[j]);
        }
      }
      powerSetResult.push(subset);
    }

    return new MathSet(powerSetResult);
  }

  public static cartesianProduct<A, B>(setA: MathSet<A>, setB: MathSet<B>): Array<[A, B]> {
    const result: Array<[A, B]> = [];
    for (const a of setA.toArray()) {
      for (const b of setB.toArray()) {
        result.push([a, b]);
      }
    }
    return result;
  }
}
