const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://pranavjay02:UXgGrd6Rg9dCf59N@cluster0.y3izltn.mongodb.net/'
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