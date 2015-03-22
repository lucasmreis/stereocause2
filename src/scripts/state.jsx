import Baobab from 'baobab';

var state = new Baobab({
  showing: 'regular', // regular, controlFreak, justBought
  stats: {
    qty: 12,
    artist: 123.45,
    charity: 234.56,
    stereoCause: 345.67
  },
  total: {
    value: 1000,
    customizing: false
  },
  dividing: {
    artist: 0.33333,
    stereoCause: 0.33333
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
});

export default state;