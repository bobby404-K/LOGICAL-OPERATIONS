# Set Theory, Power Sets & Algebraic Structures

## 1. Axiomatic & Naive Set Theory
A set is an unordered collection of distinct elements.
- Membership: $x \in A$
- Subset: $A \subseteq B \iff \forall x (x \in A \to x \in B)$
- Strict Subset: $A \subset B \iff A \subseteq B \land A \neq B$
- Set Equality: $A = B \iff A \subseteq B \land B \subseteq A$

### Russell's Paradox
Let $R = \{ x \mid x \notin x \}$.
Is $R \in R$?
- If $R \in R$, then $R \notin R$ (Contradiction).
- If $R \notin R$, then $R \in R$ (Contradiction).
Resolution: Zermelo-Fraenkel Set Theory (ZFC) avoids unrestricted comprehension.

---

## 2. Power Sets & Cartesian Products
- **Power Set $\mathcal{P}(A)$**: The set of all subsets of $A$.
  $$|\mathcal{P}(A)| = 2^{|A|}$$
- **Cartesian Product $A \times B$**: The set of ordered pairs:
  $$A \times B = \{ (a, b) \mid a \in A \land b \in B \}, \quad |A \times B| = |A| \cdot |B|$$

---

## 3. Set Operations & Boolean Isomorphism
Set operations form a Boolean algebra isomorphic to propositional logic:
| Propositional Logic | Set Theory |
| :--- | :--- |
| Conjunction $\land$ | Intersection $\cap$ |
| Disjunction $\lor$ | Union $\cup$ |
| Negation $\neg$ | Complement $\overline{A}$ |
| Tautology $\mathbf{T}$ | Universal Set $U$ |
| Contradiction $\mathbf{F}$ | Empty Set $\emptyset$ |
