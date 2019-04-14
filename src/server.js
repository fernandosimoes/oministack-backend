const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const enviroment = require('./config/enviroment');


app.use(cors());

io.on('connection', socket => {
    console.log('websocket conectado');
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect(
    'mongodb+srv://oministack:oministack@cluster0-gglfc.mongodb.net/oministack?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    return next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));
app.use(require('./routes'));

app.listen(enviroment.port || 1000);