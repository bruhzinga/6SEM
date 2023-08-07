import crypto from 'crypto';
export class ServerDH {
    constructor(prime, generator) {
        this.getContext = () => {
            const context = {
                prime: this.prime.toString('hex'),
                generator: this.generator.toString('hex'),
                keys: this.keys.toString('hex')
            };
            return context;
        };
        this.getSecret = (clientContext) => {
            console.log('SERVER SECRET :', this.dh.computeSecret(Buffer.from(clientContext.keys, 'hex')).toString('hex'));
            return this.dh.computeSecret(Buffer.from(clientContext.keys, 'hex'));
        };
        this.dh = crypto.createDiffieHellman(prime, generator);
        this.prime = this.dh.getPrime();
        this.generator = this.dh.getGenerator();
        this.keys = this.dh.generateKeys();
    }
}
//# sourceMappingURL=server-dh.js.map