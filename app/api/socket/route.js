// File: apps/storefront/app/api/socket/route.js
// This API route initializes the Socket.IO server and attaches it to the global object
// for other API routes to access, which is a common pattern in the Next.js App Router.

import { Server } from 'socket.io';

// By exporting this config, we tell Next.js to use the Node.js runtime,
// which is required for the socket server setup.
export const dynamic = 'force-dynamic';

const SocketHandler = (req, res) => {
  // Check if the socket server is already running.
  if (global.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    // Create a new Socket.IO server instance.
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: { origin: 'http://localhost:3001', methods: ['GET', 'POST'] }, // Allow dashboard origin
    });
    
    // Store the instance on the global object.
    global.io = io;
  }
  // End the request to prevent it from hanging.
  res.end();
};
