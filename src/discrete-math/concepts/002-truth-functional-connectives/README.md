# Concept 002: Truth-Functional Connectives

## 1. Mathematical Formalism

### 1.1 Definition of Truth-Functionality
A logical connective $\circ$ of arity $n$ is **truth-functional** (extensional) if the truth value of a compound formula $\circ(\phi_1, \dots, \phi_n)$ depends solely on the truth values of its constituent arguments $\phi_1, \dots, \phi_n$, rather than their intensional meanings, modal status, or causal relationships:
$$f_\circ: \mathbb{B}^n \to \mathbb{B}, \quad \text{where } \mathbb{B} = \{0, 1\}$$

For $n=1$, there are $2^{2^1} = 4$ possible unary truth functions (Identity, Negation, Contradiction, Tautology).
For $n=2$, there are $2^{2^2} = 16$ distinct binary truth functions.

### 1.2 Primitive and Derived Connectives
The canonical connectives implemented in this engine include:
1. **Negation ($\neg$)**: $f_\neg(P) = 1 - P$
2. **Conjunction ($\land$)**: $f_\land(P, Q) = \min(P, Q) = P \cdot Q$
3. **Disjunction ($\lor$)**: $f_\lor(P, Q) = \max(P, Q) = P + Q - P \cdot Q$
4. **Conditional / Material Implication ($\to$)**: $f_\to(P, Q) = \max(1 - P, Q)$
5. **Biconditional ($\leftrightarrow$)**: $f_\leftrightarrow(P, Q) = 1 - (P \oplus Q)$
6. **Exclusive Disjunction ($\oplus$)**: $f_\oplus(P, Q) = (P + Q) \pmod 2$
7. **Sheffer Stroke / NAND ($\uparrow$)**: $f_\uparrow(P, Q) = 1 - (P \cdot Q)$
8. **Peirce Arrow / NOR ($\downarrow$)**: $f_\downarrow(P, Q) = (1 - P)(1 - Q)$

### 1.3 Truth Table Semantics
| $P$ | $Q$ | $\neg P$ | $P \land Q$ | $P \lor Q$ | $P \to Q$ | $P \leftrightarrow Q$ | $P \oplus Q$ | $P \uparrow Q$ | $P \downarrow Q$ |
| :-: | :-: | :------: | :---------: | :--------: | :-------: | :-------------------: | :----------: | :------------: | :--------------: |
|  1  |  1  |    0     |      1      |     1      |     1     |           1           |      0       |       0        |        0         |
|  1  |  0  |    0     |      0      |     1      |     0     |           0           |      1       |       1        |        0         |
|  0  |  1  |    1     |      0      |     1      |     1     |           0           |      1       |       1        |        0         |
|  0  |  0  |    1     |      0      |     0      |     1     |           1           |      0       |       1        |        1         |

### 1.4 Functional Completeness & Post's Criterion
A set of truth-functional connectives $S$ is **functionally complete** if every possible $n$-ary boolean truth function $f: \mathbb{B}^n \to \mathbb{B}$ can be expressed as a formula using only connectives from $S$.
By **Emil Post's Functional Completeness Theorem (1941)**, $S$ is functionally complete if and only if it is not entirely contained in any of the 5 Post classes:
- $T_0$: Connectives that preserve falsity ($f(0,\dots,0)=0$).
- $T_1$: Connectives that preserve truth ($f(1,\dots,1)=1$).
- $M$: Monotone connectives ($x \le y \implies f(x) \le f(y)$).
- $S$: Self-dual connectives ($f(\neg x_1, \dots, \neg x_n) = \neg f(x_1, \dots, x_n)$).
- $L$: Linear / Affine connectives ($f(x_1, \dots, x_n) = c_0 \oplus c_1 x_1 \oplus \dots \oplus c_n x_n$).

Classic functionally complete sets:
- $\{\neg, \land\}$
- $\{\neg, \lor\}$
- $\{\to, \bot\}$
- Singletons (Universal Gates): $\{\uparrow\}$ (NAND), $\{\downarrow\}$ (NOR)

---

## 2. Computational Architecture

The module [`index.ts`](./index.ts) provides:
- Truth functions: `not`, `and`, `or`, `implies`, `iff`, `xor`, `nand`, `nor`.
- `evaluateConnective(op, p, q)`: Dispatches evaluation with rigorous truth semantics.
- `isFunctionallyComplete(connectives)`: Evaluates whether a chosen subset of connectives spans all Boolean functions.
- `getConnectiveProperties(op)`: Reports commutativity, associativity, idempotence, and neutral/absorbing elements.

---

## 3. Real-World Applications
- **Digital Logic Design**: Constructing ALUs and microprocessors purely from universal NAND or NOR flash gates.
- **Circuit Minimization**: Karnaugh maps and the Quine-McCluskey algorithm optimizing gate count.
- **Programming Languages**: Short-circuit evaluation semantics in compiler AST transformations.
