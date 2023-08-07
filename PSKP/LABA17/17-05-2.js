import subscriber from "./ConnectToRadis.js";

await subscriber.subscribe("example", (channel, message) => {
    console.log(channel, message);
});


setTimeout(async () => {
    await subscriber.unsubscribe("example");
    await subscriber.disconnect();
}, 20000);