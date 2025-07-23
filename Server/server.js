const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Use your local machine's IP address to make the server accessible on the local network
const port = process.env.PORT || 5000;
// const localIP = '0.0.0.0';  // Bind to all available network interfaces

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:8080"],  // Update this with your frontend IP/port if needed
    }
});

io.on('connection', socket => {
    socket.on('user-connected', (name) => {
        socket.broadcast.emit('user-joined-info', name);
    });
    socket.on('send-message', (msg, who) => {
        socket.broadcast.emit('receive-message', msg, who);
    });
    socket.on('user-disconnected', (who) => {
        socket.broadcast.emit('user-exit-info', who);
    });
});


// Helper function to get the local network IP address
// function getIPAddress() {
//     const os = require('os');
//     const interfaces = os.networkInterfaces();
//     for (let iface in interfaces) {
//         for (let alias of interfaces[iface]) {
//             if (alias.family === 'IPv4' && !alias.internal) {
//                 return alias.address;
//             }
//         }
//     }
//     return '127.0.0.1';
// }
