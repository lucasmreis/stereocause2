import R from 'ramda';
import Reqwest from 'reqwest';

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

export const apiSend = req =>
  new Promise((resolve, reject) => {
    Reqwest({
      method: req.method,

      url: compose(
        concat(req.url),
        buildParamsUri,
        prop('query')
        )(req),

      data: req.body
    }).then(
      ok => resolve(ok),
      err => reject(err)
    );
  });
