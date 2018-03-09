import { lastMessage } from '../controller/user';

let info = (msg, args = ['']) => {
  if (args.length !== 1) {
    msg.reply(`Wrong format`);
    return;
  }

  let discordId;
  try {
    discordId = args[0].match(/(\<\@\!|\<\@)+(\d+)+\>/)[2];
  } catch (e) {
    msg.reply('Invalid discord user');
    return;
  }

  let lastMsg = async () => await lastMessage(discordId);

  lastMsg().then(res => {
    msg.reply(`<@${discordId}>: ${res}`);
  });
};

export default info;
