# Rules of Inference & Formal Proof Methodologies

## 1. Valid Arguments vs Fallacies
An argument form is valid if whenever all premises are true, the conclusion must be true:
$$P_1, P_2, \dots, P_k \vdash C \iff (P_1 \land P_2 \land \dots \land P_k) \to C \text{ is a tautology.}$$

### Canonical Rules of Inference
1. **Modus Ponens (Detachment)**:
   $$p, \, p \to q \vdash q$$
2. **Modus Tollens (Denying the Consequent)**:
   $$\neg q, \, p \to q \vdash \neg p$$
3. **Hypothetical Syllogism (Transitivity)**:
   $$p \to q, \, q \to r \vdash p \to r$$
4. **Disjunctive Syllogism**:
   $$p \lor q, \, \neg p \vdash q$$
5. **Resolution Rule**:
   $$p \lor q, \, \neg p \lor r \vdash q \lor r$$

### Common Fallacies
- **Affirming the Consequent**: $(q \land (p \to q)) \to p$ (Invalid!)
- **Denying the Antecedent**: $(\neg p \land (p \to q)) \to \neg q$ (Invalid!)

---

## 2. Proof Methodologies
- **Direct Proof**: Assume $P$ is true, follow logical deductions to establish $Q$.
- **Proof by Contraposition**: To prove $P \to Q$, prove the equivalent contrapositive $\neg Q \to \neg P$.
- **Proof by Contradiction (Reductio ad Absurdum)**: Assume $\neg P$, derive a contradiction ($R \land \neg R$), concluding $P$ must be true.
  - Classic proof: Irrationality of $\sqrt{2}$.
- **Proof by Exhaustion / Cases**: Partition domain into disjoint exhaustive cases and verify each.

---

## 3. Resolution Refutation System
To prove $P_1, \dots, P_k \vdash C$:
1. Convert all premises and $\neg C$ into CNF clauses.
2. Repeatedly resolve pairs of clauses containing complementary literals $(L, \neg L)$.
3. If the empty clause $\square$ (contradiction) is derived, the argument is valid.
