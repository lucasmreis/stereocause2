import R from 'ramda';
import rp from 'request-promise';

const {compose, toPairs, concat, prop, join, map, ifElse, eq} = R;
const I = R.identity;

// {
//   method: 'GET',
//   url: 'som/url',
//   query: {
//     someUrl: 'params'
//   },
//   body: {
//     forPost: 'data'
//   }
// }

const buildParamsUri = compose(
  ifElse(eq(''), I, concat('?')),
  join('&'),
  map(join('=')),
  toPairs);

export const apiSend = req => rp({
  method: req.method,
  baseUrl: window.location.origin,
  url: compose(
    concat(req.url),
    buildParamsUri,
    prop('query')
    )(req),
  body: JSON.stringify(req.body)
}).then(JSON.parse);
