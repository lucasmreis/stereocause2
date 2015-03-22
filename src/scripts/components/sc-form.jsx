import R from 'ramda';
import React from 'react';
import State from '../state';

import RegularForm from './regular-form';
import ControlFreakForm from './control-freak-form';
import JustBought from './just-bought';

var cond = R.cond;
var eq = R.eq;
var K = R.always;
var T = R.T;

var ScForm = React.createClass({
  mixins: [State.mixin],
  cursor: ['showing'],
  render: function() {
    State.on('update', () => console.log('STATE:', State.get()));
    console.log('STATE:', State.get());

    var show = R.cond(
      [eq('regular'),      K(<RegularForm />)],
      [eq('controlFreak'), K(<ControlFreakForm />)],
      [T,                  K(<JustBought />)]);

    return <div className="container">
      <p>{ show(this.state.cursor) }</p>
    </div>
  }
});

export default ScForm;