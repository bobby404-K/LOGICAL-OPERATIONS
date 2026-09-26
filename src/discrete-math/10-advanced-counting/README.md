# Advanced Counting, Recurrence Relations & Generating Functions

## 1. Linear Recurrence Relations
A linear homogeneous recurrence of degree $k$ with constant coefficients:
$$a_n = c_1 a_{n-1} + c_2 a_{n-2} + \dots + c_k a_{n-k}$$
Solved via characteristic equation:
$$r^k - c_1 r^{k-1} - \dots - c_k = 0$$

---

## 2. Inclusion-Exclusion & Derangements
For $n$ sets:
$$\left|\bigcup_{i=1}^n A_i\right| = \sum |A_i| - \sum |A_i \cap A_j| + \dots + (-1)^{n-1} |A_1 \cap \dots \cap A_n|$$
Derangements ($!n$, permutations with no fixed points):
$$!n = n! \sum_{k=0}^n \frac{(-1)^k}{k!} \approx \left[ \frac{n!}{e} \right]$$

---

## 3. The Master Theorem
For recurrences of form $T(n) = a T(n/b) + f(n)$:
- If $f(n) = O(n^{\log_b a - \epsilon})$, then $T(n) = \Theta(n^{\log_b a})$.
- If $f(n) = \Theta(n^{\log_b a} \log^k n)$, then $T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$.
- If $f(n) = \Omega(n^{\log_b a + \epsilon})$, then $T(n) = \Theta(f(n))$.
