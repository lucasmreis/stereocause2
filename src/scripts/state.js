import Baobab from 'baobab';
import ReactAddons from 'react/addons';

var state = new Baobab({
  showing: 'regular', // regular, controlFreak, justBought
  submitCaption: 'Contribute!', // Contribute! , Validating card... , Contributing...
  stats: {
    qty: 12,
    artist: 12345,
    charity: 23456,
    stereoCause: 34567
  },
  total: {
    value: 2000,
    customizing: false
  },
  dividing: {
    artist: 1/3,
    stereoCause: 1/3
  },
  values: {
    artist: 1000,
    charity: 2000,
    stereoCause: 3000
  },
  email: 'bla@bla.com',
  notifyMe: true,
  shareMyEmail: false,
  number: '4242 4242 4242 4242',
  expiry: '12/18',
  cvc: '123'
},
{
  mixins: [ReactAddons.PureRenderMixin],
  shiftReferences: true
});

state.on('update', () => console.log('STATE', JSON.stringify(state.get(), null, '  ')));

export default state;