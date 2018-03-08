import convert from 'convert-seconds';

// Config
import config from '../config.json';

// Controller
import {
  registration,
  update,
  lastMessage
} from '../controller/user';
import displayUser from '../controller/display_user';
import { findRole } from '../controller/roles';

// Util
import {
  getDateTimeFromTimestamp,
  timeConvertMessage
} from '../util';

let usr = (msg, logger) => {
  // GET INFO FOR MESSAGE
  let {
    id: currentMessageId,
    author: {
      username: currentUsername,
      id: currentUserId
    },
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
          if (args[0].match(/^[a-z][a-z0-9\-\.]+$/)) {
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
            msg.reply(
              'Your steem username format is wrong (should start with letter, all lowercase, only can contain lowercase letters, numbers and dash)'
            );
          }
        } else {
          msg.reply('Please follow the format');
        }
        break;
      case 'update':
        if (args.length === 1) {
          if (args[0].match(/^[a-z][a-z0-9\-\.]+$/)) {
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
            msg.reply(
              'Your steem username format is wrong (should start with letter, all lowercase, only can contain lowercase letters, numbers and dash)'
            );
          }
        } else {
          msg.reply('Please follow the format');
        }
        break;
      case 'last':
        let lastMessageMsg = async () =>
          await lastMessage(currentUserId);
        lastMessageMsg()
          .then(res => {
            console.log('discord msg: ', res);
            msg.reply(res);
          })
          .catch(err => console.log('ERR'));
        break;
      case 'role':
        let checkRole = async () =>
          await findRole(currentUserId);
        checkRole().then(res => {
          console.log(res.roles);
          msg.reply(res.roles);
        });
        break;
      default:
        msg.reply(
          `Type \`${config.trigger}help\` to get started`
        );
        break;
    }
  }
};

export default usr;
