import mongoose from 'mongoose';
import User from '../model/user';
import { timeConvertMessage } from '../util';
import convert from 'convert-seconds';

const registration = (discordName, discordId, steemName) => {
  let user = new User({
    name: discordName,
    discordid: discordId,
    steemname: steemName
  });

  let result = user
    .save(err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('success');
      return;
    })
    .then(data => {
      return `Successfully created account with @${data.steemname}`;
    })
    .catch(err => {
      return 'Error on registering account. It could be you already registered.';
    });
  return result;
};

const update = (discordName, discordId, steemName) => {
  return User.findOne({ discordid: discordId }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('success');
    user.steemname = steemName;
    let result = user
      .save(err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('success');
        return;
      })
      .then(data => {
        return;
      })
      .catch(err => {
        return;
      });
    return result;
  })
    .then(
      data =>
        `Successfully updated account from @${data.steemname} to @${steemName}`
    )
    .catch(err => 'Error');
};

const lastMessage = discordId => {
  return User.findOne({ discordid: discordId }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (user) {
      return user;
    }
    return;
  })
    .then(data => {
      if (!!data) {
        return !!data.lastpostdatetime
          ? `Your last post is at ${timeConvertMessage(
              convert(Math.floor((Date.now() - data.lastpostdatetime) / 1000))
            )} ago`
          : `You have not posted on post promo channel`;
      }
      return `Cannot find last post, you are not yet register`;
    })
    .catch(err => 'Last Message Not Found.');
};

export { registration, update, lastMessage };
