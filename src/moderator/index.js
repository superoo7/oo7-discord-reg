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
import info from './info';
import delegate from './delegation';
import upvotePost from './upvote';

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
        msg.reply(`
\`${
          config.trigger
        }maintenance <on/off>\` to turn on/off maintenance mode
\`${
          config.trigger
        }roles @somebody <sponsor/user/ban>\` to change a person role
\`${
          config.trigger
        }info @somebody\` to check that person's information
\`${config.trigger}delegation\`to check delegation
or ask <@!206360732818735104> for help.
\`${
          config.trigger
        }upvote <steemit_link> <weightage>\` to upvote a post.
`);
        break;
      case 'maintenance':
        maintenance(msg, args);
        break;
      case 'delegation':
        delegate(msg, args);
        break;
      case 'roles':
        roles(msg, args);
        break;
      case 'info':
        info(msg, args);
        break;
      case 'upvote':
        if (!!args[1]) {
          let author = args[0].split(/[\/#]/)[4].substr(1);
          let permlink = args[0].split(/[\/#]/)[5];
          let weightage = parseInt(args[1]) * 100;
          if (!!author && !!permlink) {
            upvotePost(
              author,
              permlink,
              weightage,
              currentUserId,
              msg
            );
          } else {
            msg.reply('invalid format on the link');
          }
        } else {
          msg.reply(
            'invalid format, please add weightage at the end'
          );
        }
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
