import * as logger from 'winston';
import config from '../config.json';

// DB
import {
  registration,
  update,
  lastMessage
} from '../controller/user';
import displayUser from '../controller/display_user';

// MOD COMPONENT
import maintenance from './maintenance';
import roles from './roles';

let mod = msg => {
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
    switch (cmd) {
      case 'help':
        msg.reply('ask <@!206360732818735104> for help.');
        break;
      case 'maintenance':
        maintenance(msg, args);
        break;
      case 'ban':
        msg.reply('ban');
        break;
      case 'unban':
        msg.reply('unban');
        break;
      case 'roles':
        roles(msg, args);
        break;
      default:
        msg.reply(
          `Type \`${config.trigger}help\` to get started`
        );
        break;
    }
  }
  return;
};

export default mod;
