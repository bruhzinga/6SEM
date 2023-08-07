import client from "./ConnectToRadis.js"

let hsetPromises = [];
for (let i = 0; i < 10000; i++) {
    hsetPromises.push(client.hSet(`${i}`, i, JSON.stringify({id: i, val: `val-${i}`})));
}

console.time('Time to hset 10000 keys');
await Promise.all(hsetPromises);
console.timeEnd('Time to hset 10000 keys');

let hgetPromises = [];
for (let i = 0; i < 10000; i++) {
    hgetPromises.push(client.hGet(`${i}`, `${i})`));
}

console.time('Time to hget 10000 keys');
await Promise.all(hgetPromises);
console.timeEnd('Time to hget 10000 keys');

await client.disconnect();