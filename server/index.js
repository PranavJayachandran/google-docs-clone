const express = require('express');
const cors = require("cors");
const app = express();
const port = 5000;
const socketIO = require("socket.io");
const http = require("http");

const expressServer = app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
const io = socketIO(expressServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
})


io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on('chat message', (message) => {
        console.log("Recv mes", message);

        io.emit('chat message', message);
    })
    socket.on('disconnect', () => {
        console.log("A user disconnected");
    })
})

app.use(cors());
app.use(express.json());












app.get("/", (req, res) => {
    res.send("<h1>adsad</h1>");
})
