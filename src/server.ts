'use strict';

import * as hapi from "hapi";

const port: number = 3333;
const server: hapi.Server = new hapi.Server();
server.connection({ port: port });

server.route({
  method: "GET",
  path: "/",
  handler: (request: hapi.Request, reply: hapi.IReply) => {
    reply("Hello World!");
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  let message: string = `Server listening on port ${ port }...`
  console.log(message);
});


