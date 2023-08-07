import client from './ConnectToRadis.js';

await client.set('counter', 0);

let incrPromises = [];
for (let i = 0; i < 10000; i++) {
    incrPromises.push(client.incr('counter'));
}

console.time('Time to increment 10000 times');
await Promise.all(incrPromises);
console.timeEnd('Time to increment 10000 times');


console.log(await client.get('counter'));


let decrPromises = [];
for (let i = 0; i < 10000; i++) {
    decrPromises.push(client.decr('counter'));
}

console.time('Time to decrement 10000 times');
await Promise.all(decrPromises);
console.timeEnd('Time to decrement 10000 times');


console.log(await client.get('counter'));

await client.disconnect();