import { upvote } from 'steem-upvote-util';
import steem from 'steem';
import config from '../config.json';

let upvotePost = (
  author,
  permlink,
  weightage,
  moderator,
  msg
) =>
  upvote(
    process.env.STEEM_POSTING,
    process.env.STEEM_USERNAME,
    author,
    permlink,
    weightage
  )
    .then(upvoteData => {
      if (upvoteData === 'ERROR') {
        msg.reply('Error on upvoting');
      } else {
        msg.reply(`Upvoted`);
        return testingPost(author, permlink, moderator);
      }
    })
    .then(() => msg.reply('Commented'))
    .catch(() => msg.reply('Error'));

let testingPost = (author, permlink, moderator) => {
  let randomMsg =
    `Your post has been manually curated by ${moderator}<br>` +
    Math.floor(Math.random() * config.msgList.length);
  console.log(randomMsg);
  let postMessage = config.msgList[randomMsg];
  console.log(postMessage);
  steem.broadcast.comment(
    process.env.TEAMMALAYSIA_POSTING, // posting wif
    author, // author, leave blank for new post
    permlink, // first tag or permlink
    process.env.TEAMMALAYSIA, // username
    permlink, // permlink
    '', // Title,
    postMessage,
    {
      tags: ['teammalaysiadevtest', 'teammalaysia'],
      app: 'stephard/0.1'
    },
    // json metadata (additional tags, app name, etc)
    function(err, result) {
      console.log(err, result);
    }
  );
};

export default upvotePost;
