// Executable Combinatorial Counting Toolkit

export class Combinatorics {
  public static factorial(n: bigint): bigint {
    let res = 1n;
    for (let i = 2n; i <= n; i++) res *= i;
    return res;
  }

  public static permutation(n: bigint, r: bigint): bigint {
    if (r > n) return 0n;
    let res = 1n;
    for (let i = 0n; i < r; i++) {
      res *= (n - i);
    }
    return res;
  }

  public static combination(n: bigint, r: bigint): bigint {
    if (r > n) return 0n;
    if (r === 0n || r === n) return 1n;
    if (r > n / 2n) r = n - r;

    let numerator = 1n;
    let denominator = 1n;
    for (let i = 1n; i <= r; i++) {
      numerator *= (n - i + 1n);
      denominator *= i;
    }
    return numerator / denominator;
  }

  // Stars and bars: placing k indistinguishable items into n distinguishable bins
  public static starsAndBars(items: bigint, bins: bigint): bigint {
    return this.combination(items + bins - 1n, items);
  }
}
