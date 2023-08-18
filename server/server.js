const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.DB_URL
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Document = require("./Document")
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:5173/',
        methods: ["GET", "POST"],
    }
})

const defaultValue = "";

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId);
        console.log(document)
        socket.join(documentId)
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })
        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })
})

const findOrCreateDocument = async (id) => {
    if (id == null) return

    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: defaultValue })
}



const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/documents', async (req, res) => {
    const document = await Document.find();
    res.send(document)
})

app.listen(port, () => {
    console.log("server is listne");
})