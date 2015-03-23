import Baobab from 'baobab';
import ReactAddons from 'react/addons';

var state = new Baobab({
  showing: 'regular', // regular, controlFreak, justBought
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
    artist: 0.2,
    stereoCause: 0.6
  },
  values: {
    artist: 1000,
    charity: 2000,
    stereoCause: 3000
  },
  email: 'bla@bla.com',
  notifyMe: true,
  shareMyEmail: false,
  number: 1111222233334444,
  expiry: '12/08',
  cvc: '123'
},
{
  mixins: [ReactAddons.PureRenderMixin],
  shiftReferences: true
});

state.on('update', () => console.log('STATE', JSON.stringify(state.get(), null, '  ')));

export default state;