let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

// Set the path to your favicon file
app.use(favicon(path.join(__dirname, './favicon.ico')));

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve your index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle socket.io connections
io.of('/stream').on('connection', stream);

// Start the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
