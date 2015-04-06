import R from 'ramda';
import Reqwest from 'reqwest';

const compose = R.compose;
const toPairs = R.toPairs;
const concat = R.concat;
const prop = R.prop;
const join = R.join;
const map = R.map;

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
  concat('?'),
  join('&'),
  map(join('=')),
  toPairs);

export var send = req =>
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
