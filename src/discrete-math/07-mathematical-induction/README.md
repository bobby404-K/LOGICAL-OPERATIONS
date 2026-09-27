# Mathematical Induction & Structural Recursion

## 1. The Induction Framework
To prove $\forall n \ge n_0, P(n)$:
1. **Base Case**: Show $P(n_0)$ is true.
2. **Inductive Hypothesis**: Assume $P(k)$ is true for arbitrary $k \ge n_0$.
3. **Inductive Step**: Prove that $P(k) \implies P(k+1)$.
Conclude $\forall n \ge n_0, P(n)$ by the Principle of Mathematical Induction.

---

## 2. Strong Induction & Well-Ordering Principle
- **Strong Induction**: Assume $P(n_0) \land P(n_0 + 1) \land \dots \land P(k)$ to prove $P(k+1)$. Essential for prime factorizations and game theory proofs.
- **Well-Ordering Principle**: Every non-empty set of non-negative integers contains a least element. Equivalent in strength to mathematical induction.

---

## 3. Structural Induction
Used in computer science to prove properties of inductively defined data types (expressions, lists, binary trees):
- **Base Case**: Property holds for all minimal elements (leaf nodes, empty strings).
- **Inductive Step**: If property holds for sub-structures, it holds for the constructed compound structure.
