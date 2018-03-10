import mongoose from 'mongoose';
import User from '../model/user';

const changeRole = (discordId, role) => {
  return User.findOne(
    { discordid: discordId },
    (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('success');
      user.roles = role.toLowerCase();
      if (role.toLowerCase === 'user') {
        user.lastpostdatetime = [user.lastpostdatetime[0]];
      } else if (role.toLowerCase() === 'sponsor') {
        user.lastpostdatetime = [
          0,
          user.lastpostdatetime[0]
        ];
      }
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
    }
  )
    .then(data => `Successfully changed role to ${role}`)
    .catch(err => 'Error');
};

const findRole = discordId => {
  return User.findOne(
    { discordid: discordId },
    (err, user) => {
      if (err) {
        console.log(err);
        return 'Role not found';
      }
      return user.roles;
    }
  ).then(data => data);
};

export { changeRole, findRole };
