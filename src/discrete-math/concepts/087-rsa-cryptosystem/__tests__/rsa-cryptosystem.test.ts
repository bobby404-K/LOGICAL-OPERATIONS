import { describe, it, expect } from 'vitest';
import { RsaCryptosystemSolver } from '../index';

describe('Concept 087: Rsa Cryptosystem', () => {
  const solver = new RsaCryptosystemSolver();

  it('correctly reports solver metadata', () => {
    expect(solver.id).toBe('087');
    expect(solver.name).toBe('Rsa Cryptosystem');
  });

  it('evaluates logical expressions correctly', () => {
    const res = solver.evaluate('p ∨ ¬p');
    expect(res.isValid).toBe(true);
    expect(res.satisfactionDensity).toBe(1.0); // Tautology
  });

  it('verifies logical invariants under truth assignments', () => {
    expect(solver.verifyInvariant(true, true)).toBe(true);
    expect(solver.verifyInvariant(false, false)).toBe(true);
  });

  it('correctly encrypts and decrypts numbers and strings with RSA', () => {
    const keys = solver.generateKeyPair(61, 53, 17);
    const msg = 42;
    const cipher = solver.encrypt(msg, keys.publicKey);
    const decrypted = solver.decrypt(cipher, keys.privateKey);
    expect(decrypted).toBe(msg);

    const text = 'LOGIC';
    const textCipher = solver.encryptString(text, keys.publicKey);
    const textDecrypted = solver.decryptString(textCipher, keys.privateKey);
    expect(textDecrypted).toBe(text);
  });

});
