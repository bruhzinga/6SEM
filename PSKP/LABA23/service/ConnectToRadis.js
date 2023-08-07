import redis from 'redis';
async function ConnectToRadis() {
    const client = redis.createClient();
    client.on('error', (err) => {
        console.log('Error ' + err);
    });
    await client.connect();
    return client;
}
let client = await ConnectToRadis();
export default client;
//# sourceMappingURL=ConnectToRadis.js.map