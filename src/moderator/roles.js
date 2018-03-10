import { changeRole } from '../controller/roles';

let roles = (msg, args = ['']) => {
  if (args.length !== 2) {
    msg.reply(`Wrong format`);
    return;
  } else if (
    args[1].toLowerCase() !== 'user' &&
    args[1].toLowerCase() !== 'sponsor' &&
    args[1].toLowerCase() !== 'ban'
  ) {
    console.log(args[1]);
    msg.reply('Invalid role (user / sponsor)');
    return;
  }
  let discordId, role;
  try {
    discordId = args[0].match(/(\<\@\!|\<\@)+(\d+)+\>/)[2];
    role = args[1];
  } catch (e) {
    msg.reply('Invalid discord user');
    return;
  }

  let change = async () =>
    await changeRole(discordId, role);

  change().then(res => {
    msg.reply(res);
  });
};

export default roles;
