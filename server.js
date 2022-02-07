import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const corsOptions = {
  cors: {
    origin: ORIGIN,
    methods: ['GET', 'POST']
  }
};
const io = new Server(server, corsOptions);

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

server.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});

io.on('error', e => console.error(e));
io.on('connection', socket => {
  socket.on('offer', (id, message) => {
    socket.to(id).emit('offer', socket.id, message);
  });
  socket.on('answer', (id, message) => {
    socket.to(id).emit('answer', message);
  });
  socket.on('candidate', (id, message) => {
    socket.to(id).emit('candidate', message);
  });
});