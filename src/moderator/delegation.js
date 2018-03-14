
import axios from 'axios';

let delegate = (msg, args) => {
  axios.get('https://uploadbeta.com/api/steemit/delegators/?cached&id=superoo7-dev')
    .then(data1 => data1.data)
    .then(data1 => {
      let repliedMsg = data1.map((d) => {
        return `${d.delegator}:      ${d.sp} SP`
      }).join('\n');
      msg.reply(`SUPEROO7-DEV DELEGATED BY \n\`\`\`${repliedMsg}\`\`\``);
      axios.get('https://uploadbeta.com/api/steemit/delegators/?cached&id=myach')
            .then(data2 => data2.data)
            .then(data2 => {
              let repliedMsg = data2.map((d) => {
                return `${d.delegator}:      ${d.sp} SP`
              }).join('\n');
              msg.reply(`MYACH DELEGATED BY \n\`\`\`${repliedMsg}\`\`\``)
            })


    })
}

export default delegate;
