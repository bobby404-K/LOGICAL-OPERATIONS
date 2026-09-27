// Resolution-Based Formal Inference Engine

export class PropositionalResolutionProver {
  // Check if premises imply conclusion via refutation
  public static verifyInference(
    premises: string[][],
    negatedConclusion: string[][]
  ): { valid: boolean; steps: string[] } {
    const clauses: Set<string> = new Set();
    const steps: string[] = [];

    const normalize = (clause: string[]) => Array.from(new Set(clause)).sort().join(' | ');

    for (const p of premises) clauses.add(normalize(p));
    for (const c of negatedConclusion) clauses.add(normalize(c));

    steps.push(`Initial clauses: ${Array.from(clauses).join(' ; ')}`);

    let newClausesAdded = true;
    while (newClausesAdded) {
      newClausesAdded = false;
      const clauseArr = Array.from(clauses).map((c) => c.split(' | '));

      for (let i = 0; i < clauseArr.length; i++) {
        for (let j = i + 1; j < clauseArr.length; j++) {
          const c1 = clauseArr[i];
          const c2 = clauseArr[j];

          // Check for complementary literals
          for (const lit of c1) {
            const complement = lit.startsWith('¬') ? lit.slice(1) : `¬${lit}`;
            if (c2.includes(complement)) {
              // Resolve
              const resolvent = [
                ...c1.filter((l) => l !== lit),
                ...c2.filter((l) => l !== complement),
              ];

              if (resolvent.length === 0) {
                steps.push(`Resolved (${c1.join(' | ')}) and (${c2.join(' | ')}) -> EMPTY CLAUSE (Contradiction)`);
                return { valid: true, steps };
              }

              const norm = normalize(resolvent);
              if (!clauses.has(norm)) {
                clauses.add(norm);
                steps.push(`Resolved (${c1.join(' | ')}) and (${c2.join(' | ')}) -> (${norm})`);
                newClausesAdded = true;
              }
            }
          }
        }
      }
    }

    return { valid: false, steps };
  }
}
