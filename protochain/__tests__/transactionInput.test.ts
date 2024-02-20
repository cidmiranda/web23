import { describe, test, expect, beforeAll } from '@jest/globals';
import TransactionInput from '../src/lib/transactionInput';
import Wallet from '../src/lib/wallet';
import TransactionOutput from '../src/lib/transactionOutput';

describe("TransactionInput tests", () => {
    let alice: Wallet, bob: Wallet;
    const exampleTx: string = "17e3299ad48b3174af8586a0a8a67ba952d8f41b41a657f1de4244a8f5e1b6c1";

    beforeAll(() => {
        alice = new Wallet();
        bob = new Wallet();
    })

    test('Should be valid', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput)
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeTruthy();
    })

    test('Should be valid (dafaults)', () => {
        const txInput = new TransactionInput();
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (empty signature)', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput)
        
        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (negative amount)', () => {
        const txInput = new TransactionInput({
            amount: -10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput)
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (invalid signature)', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey,
            previousTx: 'abc'
        } as TransactionInput)
        txInput.sign(bob.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (invalid previousTx)', () => {
        const txInput = new TransactionInput({
            amount: 10,
            fromAddress: alice.publicKey
        } as TransactionInput)
        txInput.sign(alice.privateKey);

        const valid = txInput.isValid();
        expect(valid.success).toBeFalsy();
    })

    test('Should create from TXO', () => {
        const txi = TransactionInput.fromTxo({
            amount: 10,
            toAddress: alice.publicKey,
            tx: exampleTx
        } as TransactionOutput);
        txi.sign(alice.privateKey);
        
        txi.amount = 11;
        const result = txi.isValid();
        expect(result.success).toBeFalsy();
    })

})