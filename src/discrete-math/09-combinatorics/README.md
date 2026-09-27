# Combinatorics, Permutations, Combinations & Pigeonhole Principle

## 1. Fundamental Counting Rules
- **Product Rule**: Sequential independent choices multiply: $|A \times B| = |A| \cdot |B|$.
- **Sum Rule**: Mutually exclusive choices add: $|A \cup B| = |A| + |B|$ when $A \cap B = \emptyset$.

---

## 2. Permutations & Combinations
- Permutations without repetition: $P(n, r) = \frac{n!}{(n-r)!}$
- Combinations: $C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}$
- Combinations with repetition (Stars and Bars):
  $$\binom{n + r - 1}{r}$$

---

## 3. The Pigeonhole Principle
If $k+1$ objects are placed into $k$ boxes, at least one box contains two or more objects.
**Generalized Pigeonhole Principle**: If $N$ objects are placed into $k$ boxes, at least one box contains $\lceil N/k \rceil$ objects.
