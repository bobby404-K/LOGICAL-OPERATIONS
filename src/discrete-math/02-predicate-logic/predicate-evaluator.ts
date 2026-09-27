// Executable Finite Universe Predicate Logic Evaluator

export type Universe<T> = T[];
export type Predicate1<T> = (x: T) => boolean;
export type Predicate2<T> = (x: T, y: T) => boolean;

export class PredicateEvaluator<T> {
  private universe: Universe<T>;

  constructor(universe: Universe<T>) {
    if (universe.length === 0) {
      throw new Error('Universe of discourse must be non-empty');
    }
    this.universe = universe;
  }

  // ∀x P(x)
  public forAll(predicate: Predicate1<T>): boolean {
    return this.universe.every((x) => predicate(x));
  }

  // ∃x P(x)
  public exists(predicate: Predicate1<T>): boolean {
    return this.universe.some((x) => predicate(x));
  }

  // ∀x ∃y P(x, y)
  public forAllExists(predicate: Predicate2<T>): boolean {
    return this.universe.every((x) =>
      this.universe.some((y) => predicate(x, y))
    );
  }

  // ∃y ∀x P(x, y)
  public existsForAll(predicate: Predicate2<T>): boolean {
    return this.universe.some((y) =>
      this.universe.every((x) => predicate(x, y))
    );
  }

  // Find counterexample for ∀x P(x)
  public findCounterexample(predicate: Predicate1<T>): T | undefined {
    return this.universe.find((x) => !predicate(x));
  }
}
