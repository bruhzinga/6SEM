import client from "./ConnectToRadis.js"


let setKeysPromises = [];

for (let i = 0; i < 10000; i++) {
    setKeysPromises.push(client.set(`${i}`, `set${i}`));
}

console.time('Time to set 10000 keys');
await Promise.all(setKeysPromises);
console.timeEnd('Time to set 10000 keys');


let getKeysPromises = [];
for (let i = 0; i < 10000; i++) {
    getKeysPromises.push(client.get(`${i}`));
}

console.time('Time to get 10000 keys');
await Promise.all(getKeysPromises);
console.timeEnd('Time to get 10000 keys');

let delKeysPromises = [];
for (let i = 0; i < 10000; i++) {
    delKeysPromises.push(client.del(`${i}`));
}

console.time('Time to delete 10000 keys');
await Promise.all(delKeysPromises);
console.timeEnd('Time to delete 10000 keys');


await client.disconnect();

