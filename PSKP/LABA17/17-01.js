import client from "./ConnectToRadis.js"


await client.set('key', 'value');
const value = await client.get('key');


await client.disconnect();

console.log(value);