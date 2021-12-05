import app from "./app";

const io = require("socket.io")(3002, {
  cors: {
    origin: "*",
  },
});

const server = app.listen("3003", () => {
  console.log("Server Running on Port 3003...");
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
