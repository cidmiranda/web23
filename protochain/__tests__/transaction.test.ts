import { describe, test, expect, jest, beforeAll } from '@jest/globals';
import Transaction from '../src/lib/transaction';
import TransactionType from '../src/lib/transactionType';
import TransactionInput from '../src/lib/transactionInput';
import TransactionOutput from '../src/lib/transactionOutput';
import Wallet from '../src/lib/wallet';


jest.mock('../src/lib/transactionInput');
jest.mock('../src/lib/transactionOutput');

describe("Transaction tests", () => {
    
    const exampleDifficulty: number = 1;
    const exampleFee: number = 1;
    let alice: Wallet, bob: Wallet;
    const exampleTx: string = "17e3299ad48b3174af8586a0a8a67ba952d8f41b41a657f1de4244a8f5e1b6c1";

    beforeAll(() => {
        alice = new Wallet();
        bob = new Wallet();
    })

    test('Should be valid (REGULAR default)', () => {
        const tx = new Transaction({
            txInputs: [new TransactionInput()],
            txOutputs: [new TransactionOutput()]
        } as Transaction);

        const valid = tx.isValid(exampleDifficulty, exampleFee);
        expect(valid.success).toBeTruthy();     
        expect(valid.success).toBeFalsy();
    })

    test('Should NOT be valid (invalid txInput)', () => {
        const tx = new Transaction({
            txOutputs: [new TransactionOutput()],
            txInputs: [new TransactionInput({
                amount: -10,
                fromAddress: 'carteiraFrom',
                signature: 'abc'
            } as TransactionInput)]
        } as Transaction);
        const valid = tx.isValid(exampleDifficulty, exampleFee);
        expect(valid.success).toBeFalsy();
    })


    test('Should get fee', () => {
        const txIn = new TransactionInput({
            amount: 11,
            fromAddress: alice.publicKey,
            previousTx: exampleTx
        } as TransactionInput);
        txIn.sign(alice.privateKey);

        const txOut = new TransactionOutput({
            amount: 10,
            toAddress: bob.publicKey
        } as TransactionOutput);

        const tx = new Transaction({
            txInputs: [txIn],
            txOutputs: [txOut]
        } as Transaction);

        const result = tx.getFee();

        expect(result).toBeGreaterThan(0);
    })

    test('Should get zero fee', () => {
        const tx = new Transaction();
        tx.txInputs = undefined;
        const result = tx.getFee();

        expect(result).toEqual(0);
    })

    test('Should create from reward', () => {
        const tx = Transaction.fromReward({
            amount: 10,
            toAddress: alice.publicKey,
            tx: exampleTx
        } as TransactionOutput);

        const result = tx.isValid(exampleDifficulty, exampleFee);
        expect(result.success).toBeTruthy;
    })
})