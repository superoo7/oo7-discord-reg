import * as Discord from 'discord.js';
import * as logger from 'winston';
import * as dotenv from 'dotenv';
// import * as steem from 'steem';
import * as http from 'http';
import convert from 'convert-seconds';

import 'babel-polyfill';

dotenv.config();

import { getDateTimeFromTimestamp, timeConvertMessage } from './util';

// Controller
import { registration, update, lastMessage } from './controller/user';

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
  // GET INFO FOR MESSAGE
  let {
    id: currentMessageId,
    author: { username: currentUsername, id: currentUserId },
    content: currentContent,
    createdTimestamp: currentCreatedTimestamp
  } = msg;

  if (currentContent.substring(0, 1) == config.trigger) {
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);
    // CONSOLE LOGGING
    logger.info(`CMD: ${cmd}`);
    logger.info(`ARGS: ${args}`);
    console.log(args);
    // END
    switch (cmd) {
      case 'help':
        msg.reply(`\n Stephard-Registration Bot v1.0 \n
Type \`${
          config.trigger
        }reg <steem_name>\` to register your steem account with discord.\n
Type \`${
          config.trigger
        }update <steem_name>\` to update your steem account name.\n
Type \`${config.trigger}last\` to check your last message.
          `);
        break;
      case 'reg':
        if (args.length === 1) {
          let regMsg = async () => {
            let discordMessage = await registration(
              currentUsername,
              currentUserId,
              args[0]
            );
            return discordMessage;
          };
          regMsg().then(res => {
            console.log('discord msg: ', res);
            msg.reply(res);
          });
        } else {
          msg.reply('Please follow the format');
        }
        break;
      case 'update':
        if (args.length === 1) {
          let updateMsg = async () => {
            let discordMessage = await update(
              currentUsername,
              currentUserId,
              args[0]
            );
            return discordMessage;
          };
          updateMsg().then(res => {
            console.log('discord msg: ', res);
            msg.reply(res);
          });
        } else {
          msg.reply('Please follow the format');
        }
        break;
      case 'last':
        let lastMessageMsg = async () => {
          let discordMessage = await lastMessage(currentUserId);
          return discordMessage;
        };
        lastMessageMsg()
          .then(res => {
            console.log('discord msg: ', res);
            msg.reply(res);
          })
          .catch(err => console.log('ERR'));
        break;
      default:
        msg.reply(`Type \`${config.trigger}help\` to get started`);
        break;
    }
  }
});

// setup server
client.login(process.env.DISCORD_TOKEN); // Start server
http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('superoo7 bot still alive', 'utf-8');
  })
  .listen(process.env.PORT || 5000);
