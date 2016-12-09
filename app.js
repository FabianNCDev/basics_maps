const http = require('http');
const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.get('/', (req, res, next) => {
  res.render('index');
});

app.use(express.static(path.join(__dirname, 'public')));

var sockets = io(server);

sockets.on('connection', function(socket) {
  console.log('new user');
  socket.on('coords:me', function (data) {
    console.log(data);
    sockets.emit('coord:users', data);
  })
})

server.listen(3000, function () {
  console.log('3000');
});
