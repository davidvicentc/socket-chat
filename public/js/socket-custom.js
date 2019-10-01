var socket = io();
var list = $("#msgs");
var input = $("#input-msg");
var formMsg = $("#form-msg");
socket.on("connect", function() {
  console.log("Conectado al servidor");
});

formMsg.submit(function(e) {
  e.preventDefault();
  socket.emit("sendMessage", input.val());
  input.val("");
});

// escuchar
socket.on("disconnect", function() {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información

socket.on("newMessage", function(element) {
  var li = document.createElement("li");
  li.textContent = `${element.user} - ${element.msg}`;
  list.append(li);
});

socket.on("loadChat", function(msgs) {
  console.log(msgs);
  msgs.forEach(element => {
    var li = document.createElement("li");

    li.textContent = `${element.user} - ${element.msg}`;
    list.append(li);
  });
});
