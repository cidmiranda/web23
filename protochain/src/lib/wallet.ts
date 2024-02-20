import * as ecc from 'tiny-secp256k1';
import ECPairFactory, { ECPairInterface } from 'ecpair';

const ECPair = ECPairFactory(ecc);

/**
 * Wallet class
 */
export default class Wallet {

    privateKey: string;
    publicKey: string;

    constructor(witOrPrivateKey?: string){
        let keys;
        if(witOrPrivateKey) {
            if(witOrPrivateKey?.length === 64)
                keys = ECPair.fromPrivateKey(Buffer.from(witOrPrivateKey, "hex"));
            else
                keys = ECPair.fromWIF(witOrPrivateKey);
        }
        else
            keys = ECPair.makeRandom();

        /* c8 ignore next */
        this.privateKey = keys.privateKey?.toString("hex") || "";
        this.publicKey = keys.publicKey.toString("hex");
    }
}