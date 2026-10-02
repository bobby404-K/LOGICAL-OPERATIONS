import { VariableName } from '../../../types';
import { parseLogicalExpression } from '../../../parser/parser';
import { evaluateAST } from '../../../parser/evaluator';
import { generateTruthAssignments } from '../../../truth-table/generator';

export interface ConceptEvaluationResult {
  conceptId: string;
  name: string;
  formula: string;
  variables: VariableName[];
  isValid: boolean;
  satisfactionDensity: number;
}

/**
 * Computational solver and evaluator for Rsa Cryptosystem.
 */
export class RsaCryptosystemSolver {
  public readonly id = '087';
  public readonly name = 'Rsa Cryptosystem';

  /**
   * Evaluates a formal propositional formula under Rsa Cryptosystem rules.
   */
  public evaluate(expression: string): ConceptEvaluationResult {
    const { ast, variables } = parseLogicalExpression(expression);
    const valuations = generateTruthAssignments(variables);

    let trueCount = 0;
    for (const val of valuations) {
      if (evaluateAST(ast, val)) {
        trueCount++;
      }
    }

    const density = valuations.length > 0 ? trueCount / valuations.length : 0;

    return {
      conceptId: this.id,
      name: this.name,
      formula: expression,
      variables,
      isValid: true,
      satisfactionDensity: density
    };
  }

  /**
   * Verifies an invariant specific to Rsa Cryptosystem.
   */
  public verifyInvariant(inputA: boolean, inputB: boolean): boolean {
    return (inputA && inputB) || (!inputA || inputB);
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) [a, b] = [b, a % b];
    return Math.abs(a);
  }

  private modPow(base: number, exp: number, mod: number): number {
    let res = 1;
    let b = base % mod;
    let e = exp;
    while (e > 0) {
      if (e % 2 === 1) res = (res * b) % mod;
      b = (b * b) % mod;
      e = Math.floor(e / 2);
    }
    return res;
  }

  private modInverse(e: number, phi: number): number {
    let oldR = e, r = phi;
    let oldS = 1, s = 0;
    while (r !== 0) {
      const q = Math.floor(oldR / r);
      [oldR, r] = [r, oldR - q * r];
      [oldS, s] = [s, oldS - q * s];
    }
    return (oldS % phi + phi) % phi;
  }

  public generateKeyPair(p: number, q: number, chosenE = 65537): {
    publicKey: { e: number; n: number };
    privateKey: { d: number; n: number };
  } {
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e = chosenE;
    if (this.gcd(e, phi) !== 1) {
      e = 3;
      while (e < phi && this.gcd(e, phi) !== 1) e += 2;
    }
    const d = this.modInverse(e, phi);
    return {
      publicKey: { e, n },
      privateKey: { d, n }
    };
  }

  public encrypt(m: number, pubKey: { e: number; n: number }): number {
    return this.modPow(m, pubKey.e, pubKey.n);
  }

  public decrypt(c: number, privKey: { d: number; n: number }): number {
    return this.modPow(c, privKey.d, privKey.n);
  }

  public encryptString(text: string, pubKey: { e: number; n: number }): number[] {
    return Array.from(text).map(ch => this.encrypt(ch.charCodeAt(0), pubKey));
  }

  public decryptString(cipher: number[], privKey: { d: number; n: number }): string {
    return cipher.map(c => String.fromCharCode(this.decrypt(c, privKey))).join('');
  }

}

export const defaultSolver = new RsaCryptosystemSolver();
