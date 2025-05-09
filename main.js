const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// const client = new Client();

// Local auth strategy
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'session-store'// this is where the session data will be stored
    })
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Listening to all incoming messages
client.on("message_create", (message) => {
  console.log(message.body);
});

// Replying to messages
client.on("message_create", (message) => {
  if (message.body === "!ping") {
    // send back "pong" to the chat the message was sent in
    client.sendMessage(message.from, "pong");

    // reply back "pong" directly to the message
    // message.reply("pong");
  }
});

client.initialize();
