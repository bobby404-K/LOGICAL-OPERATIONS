// Executable Number Theory & RSA Public Key Cipher Suite

export class NumberTheory {
  public static gcd(a: bigint, b: bigint): bigint {
    while (b !== 0n) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  // Extended Euclidean Algorithm: returns [gcd, x, y] such that a*x + b*y = gcd
  public static extendedGCD(a: bigint, b: bigint): [bigint, bigint, bigint] {
    if (b === 0n) return [a, 1n, 0n];
    const [gcd, x1, y1] = this.extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - (a / b) * y1;
    return [gcd, x, y];
  }

  // Modular Multiplicative Inverse
  public static modInverse(a: bigint, m: bigint): bigint {
    const [gcd, x] = this.extendedGCD(a, m);
    if (gcd !== 1n) throw new Error('Inverse does not exist (not coprime)');
    return (x % m + m) % m;
  }

  // Modular Exponentiation: (base^exp) mod mod
  public static modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      exp = exp / 2n;
      base = (base * base) % mod;
    }
    return res;
  }
}
