// Connect to the application using sockets.io
import socketio from 'socket.io-client';
// Pull the URL from the process env
const io = socketio('/', { path: '/api/socket' });
// Return the connection (makes this a singleton)
export default io;
