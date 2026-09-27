// Executable DPLL SAT Solver Implementation

export type Literal = number; // positive = variable x, negative = negated variable ¬x
export type Clause = Literal[];
export type CNFFormula = Clause[];
export type Model = Map<number, boolean>;

export class DPLLSolver {
  private formula: CNFFormula;

  constructor(formula: CNFFormula) {
    this.formula = formula;
  }

  public solve(): { satisfiable: boolean; model?: Model } {
    const model: Model = new Map();
    const result = this.dpll(this.formula, model);
    return result ? { satisfiable: true, model } : { satisfiable: false };
  }

  private dpll(clauses: CNFFormula, model: Model): boolean {
    // 1. Simplify clauses based on current assignments
    let simplified = this.simplify(clauses, model);

    // If formula contains an empty clause, contradiction reached
    if (simplified.some((clause) => clause.length === 0)) {
      return false;
    }

    // If all clauses are satisfied, formula is SAT
    if (simplified.length === 0) {
      return true;
    }

    // 2. Unit Propagation
    let unitClause = simplified.find((c) => c.length === 1);
    while (unitClause) {
      const lit = unitClause[0];
      const variable = Math.abs(lit);
      const val = lit > 0;
      model.set(variable, val);

      simplified = this.simplify(simplified, model);
      if (simplified.some((c) => c.length === 0)) return false;
      if (simplified.length === 0) return true;

      unitClause = simplified.find((c) => c.length === 1);
    }

    // 3. Choose branching variable
    const nextVar = Math.abs(simplified[0][0]);

    // Branch 1: Try True
    const modelTrue = new Map(model);
    modelTrue.set(nextVar, true);
    if (this.dpll(simplified, modelTrue)) {
      modelTrue.forEach((v, k) => model.set(k, v));
      return true;
    }

    // Branch 2: Try False
    const modelFalse = new Map(model);
    modelFalse.set(nextVar, false);
    if (this.dpll(simplified, modelFalse)) {
      modelFalse.forEach((v, k) => model.set(k, v));
      return true;
    }

    return false;
  }

  private simplify(clauses: CNFFormula, model: Model): CNFFormula {
    const remaining: Clause[] = [];

    for (const clause of clauses) {
      let isSatisfied = false;
      const newClause: Literal[] = [];

      for (const lit of clause) {
        const variable = Math.abs(lit);
        if (model.has(variable)) {
          const assignedVal = model.get(variable)!;
          const litVal = lit > 0 ? assignedVal : !assignedVal;
          if (litVal) {
            isSatisfied = true;
            break;
          }
        } else {
          newClause.push(lit);
        }
      }

      if (!isSatisfied) {
        remaining.push(newClause);
      }
    }

    return remaining;
  }
}
