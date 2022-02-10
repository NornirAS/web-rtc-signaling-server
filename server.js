import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { ORIGIN, PORT } from './config.js';
import { cameraServiceAgentInit, videoServiceAgentInit } from './service-agents/index.js';

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

// Web RTC signaling
io.on('error', e => console.error(e));
io.on('connection', socket => {
  socket.on('offer', (id, message) => {
    console.log('offer', id)
    socket.to(id).emit('offer', socket.id, message);
  });
  socket.on('answer', (id, message) => {
    console.log('answer', id)
    socket.to(id).emit('answer', message);
  });
  socket.on('candidate', (id, message) => {
    console.log('candidate', id)
    socket.to(id).emit('candidate', message);
  });
});

// Service Agents
cameraServiceAgentInit();
videoServiceAgentInit();