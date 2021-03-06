// Connect to the application using sockets.io
import socketio from 'socket.io-client';
// Pull the URL from the process env
const io = socketio(`${process.env.REACT_APP_API_URL}`);
// Return the connection (makes this a singleton)
export default io;
