# Number Theory, Modular Arithmetic & Modern Cryptography

## 1. Divisibility & Primes
- Division Algorithm: $a = dq + r$, with $0 \le r < d$.
- Fundamental Theorem of Arithmetic: Every integer $> 1$ has a unique prime factorization.

---

## 2. Euclidean & Extended Euclidean Algorithm
- $\gcd(a, b) = \gcd(b, a \bmod b)$.
- **Bézout's Identity**: There exist integers $x, y$ such that:
  $$ax + by = \gcd(a, b)$$

---

## 3. RSA Cryptosystem
1. Choose distinct large primes $p, q$. Compute $n = pq$ and $\phi(n) = (p-1)(q-1)$.
2. Choose public exponent $e$ such that $\gcd(e, \phi(n)) = 1$.
3. Compute private exponent $d \equiv e^{-1} \pmod{\phi(n)}$.
4. Encryption: $c \equiv m^e \pmod n$.
5. Decryption: $m \equiv c^d \pmod n$.
