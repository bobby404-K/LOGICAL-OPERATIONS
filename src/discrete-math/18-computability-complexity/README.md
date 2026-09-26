# Computability Theory, Turing Machines & Complexity (P vs NP)

## 1. Formal Turing Machine Definition
A Turing Machine is a 7-tuple $M = (Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject})$:
- Infinite tape divided into cells
- Read/write head capable of moving Left ($L$) or Right ($R$)
- Transition function: $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$

---

## 2. Decidability & The Halting Problem
- A language is **Decidable (Recursive)** if some TM halts on all inputs and accepts iff $w \in L$.
- A language is **Turing-Recognizable (Recursively Enumerable)** if some TM halts and accepts iff $w \in L$.

**Alan Turing's Halting Problem ($A_{TM}$)**:
$$A_{TM} = \{ \langle M, w \rangle \mid M \text{ is a TM and } M \text{ accepts } w \}$$
Theorem: $A_{TM}$ is **undecidable** (proven via Cantor's diagonal argument).

---

## 3. Computational Complexity: P vs NP
- **P**: Problems solvable by a deterministic TM in polynomial time $O(n^k)$.
- **NP**: Problems verifiable by a deterministic TM in polynomial time.
- **NP-Complete**: Problems in NP to which all other NP problems reduce in polynomial time.
