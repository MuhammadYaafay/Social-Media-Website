const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000", 
  },
});

let users = []; // Array to hold users with their userId and socketId

// Add a user to the list
const addUser = (userId, socketId) => {
  // Only add the user if they are not already in the list
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

// Remove a user based on their socketId when they disconnect
const removeUser = (socketId) => {
  // Filter out the user who disconnected based on socketId
  users = users.filter((user) => user.socketId !== socketId);
};

// Get user information by their userId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // When a user connects
  console.log("a user connected");

  // Listen for the "addUser" event and add the user to the list
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`User added: ${userId} with socketId: ${socket.id}`);
    io.emit("getUsers", users); // Emit the updated users list to all clients
  });

  // Listen for the "sendMessage" event and broadcast the message to the receiver
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId); // Get the receiver's socket information
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      }); // Send the message to the receiver
    } else {
      console.log(`User with ID ${receiverId} not connected`);
    }
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id); // Remove the user from the list
    io.emit("getUsers", users); // Emit the updated users list to all clients
  });
});
