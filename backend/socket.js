import { Server } from "socket.io";

import conversations from "./schemas/messageSchema.js";

const socketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("socket connected successfully with id " + socket.id);

    socket.on("disconnect", () => {
      // console.log("user disconnected");
    });

    socket.on("join", (userEmail) => {
      // Join a room with the user's email
      socket.join(userEmail);
      console.log(`User ${userEmail} joined their room`);
    });

    socket.on("sendMessage", async (messageLayout) => {
      try {
        const newMessage = new conversations(messageLayout);
        await newMessage.save();
        
        // Emit only to sender and receiver rooms
        io.to(messageLayout.sender).to(messageLayout.reciever).emit('sendLiveMessage', newMessage);
      } catch (err) {
        console.log("check socket.js\n", err);
      }
    });

    socket.on("login", (userData) => {
      console.log(`a user logged in ${userData.email}`);
      // Join user's room on login
      socket.join(userData.email);
    });
  });
};

export default socketConnection;



