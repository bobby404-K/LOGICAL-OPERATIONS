# Boolean Algebra, Digital Logic Gates & Circuit Minimization

## 1. Axioms of Boolean Algebra
A Boolean algebra $\langle B, +, \cdot, ', 0, 1 \rangle$ satisfies:
1. Closure under $+$ and $\cdot$
2. Commutativity: $x + y = y + x$, $x \cdot y = y \cdot x$
3. Distributivity: $x \cdot (y + z) = (x \cdot y) + (x \cdot z)$, $x + (y \cdot z) = (x + y) \cdot (x + z)$
4. Identity: $x + 0 = x$, $x \cdot 1 = x$
5. Complementarity: $x + x' = 1$, $x \cdot x' = 0$

---

## 2. Circuit Minimization & Karnaugh Maps
Logic circuits are simplified to minimize propagation delay and transistor counts using K-maps or the **Quine-McCluskey Algorithm**.
