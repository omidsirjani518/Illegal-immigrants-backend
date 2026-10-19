let onlineUsers = {};

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('login', (userId) => {
      onlineUsers[userId] = socket.id;
      console.log('userOnline', { userId })
      io.emit('userOnline', { userId });
    });

    socket.on('logout', (userId) => {
      delete onlineUsers[userId];
      io.emit('userOffline', { userId });
    });

    socket.on('sendNotification', ({ toUserId, message }) => {
      const targetSocket = onlineUsers[toUserId];
      if (targetSocket) {
        io.to(targetSocket).emit('notification', { message });
      }
    });

    socket.on('disconnect', () => {
      for (let userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) delete onlineUsers[userId];
      }
      io.emit('updateOnlineUsers', Object.keys(onlineUsers));
    });
  });
};

module.exports = socketHandler;
