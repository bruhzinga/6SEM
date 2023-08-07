import publisher from "./ConnectToRadis.js";

let i = 0;


let send = setInterval(async () => {
    await publisher.publish("example", JSON.stringify(
        {
            title: "Hello world",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            id: i++,
        }
    ));
    console.log("sent");
}, 1000);

setInterval(async () => {
    clearInterval(send);
    await publisher.disconnect();
    console.log("disconnected");
}, 20000);