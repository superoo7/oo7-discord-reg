import mongoose from 'mongoose';
import User from '../model/user';

let displayUser = () => {
  return User.find({}, (err, users) => {
    if (err) {
      return 'ERROR';
    }
    return;
  }).then(data => {
    let result = '';
    data.map(user => {
      console.log(user);
      result += `Discord Name: ${user.name}<br>Steem UserName: @${
        user.steemname
      }<br><hr><br>`;
    });
    return result;
  });
};

export default displayUser;
