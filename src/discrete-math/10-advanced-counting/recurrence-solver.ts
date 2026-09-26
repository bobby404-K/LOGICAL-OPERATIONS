// Recurrence Relation & Derangement Calculator

export class RecurrenceSolver {
  // Closed-form Fibonacci: F_n via Binet's formula
  public static fibonacciClosedForm(n: number): number {
    const phi = (1 + Math.sqrt(5)) / 2;
    const psi = (1 - Math.sqrt(5)) / 2;
    return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5));
  }

  // Exact Derangements calculation
  public static derangements(n: number): bigint {
    if (n === 0) return 1n;
    if (n === 1) return 0n;
    let prev2 = 1n;
    let prev1 = 0n;
    let curr = 0n;
    for (let i = 2; i <= n; i++) {
      curr = BigInt(i - 1) * (prev1 + prev2);
      prev2 = prev1;
      prev1 = curr;
    }
    return curr;
  }
}
