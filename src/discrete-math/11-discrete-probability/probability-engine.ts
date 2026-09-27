// Discrete Probability & Bayes Theorem Engine

export class ProbabilityEngine {
  public static bayesTheorem(
    priorA: number,
    likelihoodBGivenA: number,
    likelihoodBGivenNotA: number
  ): number {
    const pNotA = 1 - priorA;
    const totalB = (likelihoodBGivenA * priorA) + (likelihoodBGivenNotA * pNotA);
    return (likelihoodBGivenA * priorA) / totalB;
  }

  public static expectedValue(values: number[], probabilities: number[]): number {
    if (values.length !== probabilities.length) {
      throw new Error('Values and probabilities arrays must match length');
    }
    return values.reduce((sum, v, i) => sum + v * probabilities[i], 0);
  }

  public static variance(values: number[], probabilities: number[]): number {
    const mean = this.expectedValue(values, probabilities);
    return values.reduce(
      (sum, v, i) => sum + Math.pow(v - mean, 2) * probabilities[i],
      0
    );
  }
}
