import * as Discord from 'discord.js';
import * as logger from 'winston';
import * as dotenv from 'dotenv';
// import * as steem from 'steem';
import * as http from 'http';

import 'babel-polyfill';

dotenv.config();

// User
import usr from './user';

// Moderator
import mod from './moderator';
import moderator from '../../moderator.json';

// Database
import db from './db';
db();

import config from './config.json';

// start client
const client = new Discord.Client();

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

// on message receive
client.on('message', msg => {
  let channelId = msg.channel.id;
  let userId = msg.author.id;

  // Make sure Bot is at reg channel and mod channel and it is not bot itself.
  if (
    (channelId !== config.channelId &&
      channelId !== config.modId) ||
    userId === config.botId
  ) {
    return;
  } else if (msg.channel.id === config.channelId) {
    // If the bot is at maintenance
    if (!!moderator.maintenance) {
      msg.reply('The bot is under maintenance');
      return;
    }
    usr(msg, logger);
  } else {
    // MODERATOR
    // GET INFO FOR MESSAGE
    mod(msg);
  }
});

// setup server
client.login(process.env.DISCORD_TOKEN); // Start server
http
  .createServer(function(request, response) {
    displayUser().then(user => {
      console.log(user);
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end(
        `<h1>superoo7 bot still alive!</h1>${user}}`,
        'utf-8'
      );
    });
  })
  .listen(process.env.PORT || 5000);
