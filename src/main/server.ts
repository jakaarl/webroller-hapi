'use strict';

import * as hapi from 'hapi';
import * as socket from 'socket.io'
import { Email, User, UserManager } from './users'
import { ChannelManager } from './channels'

const channelManager: ChannelManager = new ChannelManager()
const userManager: UserManager = new UserManager() 
const port: number = 3333
const server: hapi.Server = new hapi.Server()
server.connection({ port: port })

/* "GET /" should serve web client, this is just for debugging until then */ 
server.route({
  method: "GET",
  path: "/",
  handler: (request: hapi.Request, reply: hapi.IReply) => {
    let data = {
      channels: channelManager.channels()
    }

    reply(data);
  }
})

server.route({
  method: "POST",
  path: "/register",
  handler: (request: hapi.Request, reply: hapi.IReply) => {
    let payload = request.payload
    let email = Email.valueOf(payload.email)
    let name = payload.name // TODO: validate
    let channel = payload.channel // TODO: validate
    if (email && name && channel) { // TODO: error handling
      userManager.createToken(email, name, channel)
      reply().code(204)
    }
  }
})

server.route({
  method: "POST",
  path: "/channel",
  handler: (request: hapi.Request, reply: hapi.IReply) => {
    let payload = request.payload
    let channel = channelManager.createChannel(payload.name, user)
    if (channel) {
      reply(channel)
    } else {
      reply({ error: 'Creating channel failed.' }).code(500)
    }
  }
})

server.start((err) => {
  if (err) {
    throw err;
  }
  let message: string = `Server listening on port ${ port }...`
  console.log(message);
})


