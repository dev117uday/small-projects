const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + "/src"))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		socket.broadcast.emit('chat message', msg);
	});
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});


