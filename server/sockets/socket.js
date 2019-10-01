const { io } = require("../server");
const Message = require("../../models/Messages");

io.on("connection", async client => {
  console.log("Usuario conectado");

  let msgs = await Message.find({}).sort({ date: "desc" });
  client.emit("loadChat", msgs);

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  // Escuchar el cliente

  client.on("sendMessage", async msg => {
    console.log(msg);
    let message = new Message({
      user: "david",
      msg
    });
    await message.save();
    io.sockets.emit("newMessage", message);
  });
});
