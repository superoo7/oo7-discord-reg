import fs from 'fs';
import config from '../config.json';
import moderator from '/root/moderator.json';

let location = '/root/moderator.jsonn';

let maintenance = (msg, args = ['']) => {
  if (args.length === 0) {
    msg.reply(
      `Currently mantainance: ${
        moderator.maintenance ? 'ON' : 'OFF'
      }`
    );
    return;
  }

  if (args[0].toLowerCase() === 'on') {
    moderator.maintenance = true;
    fs.writeFile(
      location,
      JSON.stringify(moderator),
      function(err) {
        if (err) {
          msg.reply('Failed to update');
          return;
        }
        console.log(JSON.stringify(moderator));

        msg.reply('Mantainance MODE: ON');
      }
    );
  } else if (args[0].toLowerCase() === 'off') {
    moderator.maintenance = false;
    fs.writeFile(
      location,
      JSON.stringify(moderator),
      function(err) {
        if (err) {
          msg.reply('Failed to update');
          return;
        }
        console.log(JSON.stringify(moderator));

        msg.reply('Mantainance MODE: OFF');
      }
    );
  } else if (args[0].toLowerCase() === 'debug') {
    msg.reply(`
\`\`\`
${JSON.stringify(moderator)}
\`\`\`
      `);
  } else {
    msg.reply(
      `Currently mantainance: ${
        moderator.maintenance ? 'ON' : 'OFF'
      }\nWrong format: \`${
        config.trigger
      }mantainance on\` or \`${
        config.trigger
      }mantainance off\`.`
    );
  }

  return;
};

export default maintenance;
