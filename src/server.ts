import { Server, Socket } from 'socket.io';
import { Server as httpServer }  from 'http';
import * as app from './app';
import log from './log/logger';
import mongo from './connection/mongodbConnection';
import 'dotenv/config'

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
let appServer: httpServer;

/**
 * Initialize APP
 */
async function initialize() {
  await mongo.initialize();
  appServer = await app.appInitialize();

  const io = new Server(appServer);

  // Socket.io connections
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Handle chat messages
    socket.on('chat message', (msg: string) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });
}


async function closeConnection(){
  return new Promise((resolve)=>{
    appServer.close(()=>{
      log.info("Server Connection Closed")
      return resolve
    });
  })
}

/**
 * Start of application
 */
(async () => {
  await initialize();
  log.info("[*] Application Initialized".yellow);

  async function disconnectApplicationsAndExit() {
      log.info(' => Caught interrupt signal');

      await mongo.disconnect();

      if(appServer)
        await closeConnection()

      process.exit();
  }

  process.on('SIGINT', () => disconnectApplicationsAndExit());
  // process.on('SIGTERM', () => disconnectApplicationsAndExit());
  process.on('exit', () => {
      log.info('Goodbye!'.green);
  });

})();






