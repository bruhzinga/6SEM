import crypto from 'crypto';
export class ClientDH {
    constructor(serverContext) {
        this.getContext = () => {
            const context = {
                prime: this.prime.toString('hex'),
                generator: this.generator.toString('hex'),
                keys: this.keys.toString('hex')
            };
            return context;
        };
        this.getSecret = (serverContext) => {
            console.log('CLIENT SECRET:', this.dh.computeSecret(Buffer.from(serverContext.keys, 'hex')).toString('hex'));
            return this.dh.computeSecret(Buffer.from(serverContext.keys, 'hex'));
        };
        this.prime = Buffer.from(serverContext.prime, 'hex');
        this.generator = Buffer.from(serverContext.generator, 'hex');
        this.dh = crypto.createDiffieHellman(this.prime, this.generator);
        this.keys = this.dh.generateKeys();
    }
}
//# sourceMappingURL=client-dh.js.map