// connect to socket on server

const socket = io.connect("http://localhost:" + process.env.PORT);

const output = document.querySelector("#output");
const messages = document.querySelector("#messages");
const handle = document.querySelector("#handle");
const button = document.querySelector("#send");
const feedBack = document.querySelector("#feedback");

const alert = new Audio("alert.mp3");

// emit event
button.addEventListener("click", (e) => {
  socket.emit("chat", {
    message: messages.value,
    handle: handle.value,
  });
});

messages.addEventListener("keypress", (e) => {
  socket.emit("keypress", {
    handle: handle.value,
  });
});

// listen for events
socket.on("chat", (data) => {
  output.innerHTML += `<p style="padding: 20px;"><strong>${data.handle}: ${data.message}</strong></p>`;
  alert.play();
});

socket.on("keypress", (data) => {
  feedBack.innerHTML = `<p style="padding: 20px; font-weight: 300;"><em>${data.handle} is typing...</em></p>`;
});
