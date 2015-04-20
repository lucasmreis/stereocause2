import config from './config';
import Mandrill from 'mandrill-api/mandrill';

var mandrillClient = new Mandrill.Mandrill(config.mandrill.key);

const message = (to, buyId) => ({
  'html': '<p>Thanks for buying at Stereo Cause!</p><p>' + buyId + '</p>',
  'subject': 'Thanks for buying at Stereo Cause!',
  'from_email': 'stereocause@stereocause.com',
  'from_name': 'Stereo Cause',
  'to': [{
          'email': to,
          'name': to,
          'type': 'to'
      }],
  'headers': {
      'Reply-To': 'stereocause@stereocause.com'
  },
  'important': false,
  'tags': [
      'stereocause', 'stereo-cause', 'music', 'charity'
  ]
});

export const sendMail = (to, buyId) =>
  new Promise((resolve, reject) =>
    mandrillClient.messages.send({ message: message(to, buyId) },
      ok => resolve(ok),
      err => reject(err)));