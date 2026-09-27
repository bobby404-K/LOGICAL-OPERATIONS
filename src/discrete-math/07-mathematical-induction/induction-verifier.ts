// Inductive Base Case & Invariant Verification Harness

export class InductionHarness {
  // Verifies polynomial summation: sum_{i=1}^n i = n(n+1)/2
  public static verifyGaussSum(limit: number): boolean {
    let accumulator = 0;
    for (let n = 1; n <= limit; n++) {
      accumulator += n;
      const closedForm = (n * (n + 1)) / 2;
      if (accumulator !== closedForm) return false;
    }
    return true;
  }

  // Verifies sum of powers of 2: sum_{i=0}^n 2^i = 2^{n+1} - 1
  public static verifyGeometricSum(limit: number): boolean {
    let accumulator = 0;
    for (let n = 0; n <= limit; n++) {
      accumulator += Math.pow(2, n);
      const closedForm = Math.pow(2, n + 1) - 1;
      if (accumulator !== closedForm) return false;
    }
    return true;
  }
}
