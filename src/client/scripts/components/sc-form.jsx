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

  show: R.cond(
      [eq('regular'),      K(<RegularForm />)],
      [eq('controlFreak'), K(<ControlFreakForm />)],
      [T,                  K(<JustBought />)]),

  render: function() {
    return <div className="container">
      { this.show(this.state.cursor) }
    </div>
  }
});

export default ScForm;