let ioRef = null;
export const initSockets = (io) => {
  ioRef = io;
  io.on('connection', (socket) => {
    socket.on('joinRole', (role) => socket.join(role));
  });
};
export const pushAlert = (payload) => {
  if (!ioRef) return;
  ioRef.to('EMERGENCY_OFFICER').emit('alert', payload);
  ioRef.to('HEALTH_OFFICER').emit('alert', payload);
};
