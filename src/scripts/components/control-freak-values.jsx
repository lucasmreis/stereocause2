import React from 'react';
import State from '../state';

import DividingOptions from './dividing-options';
import Input from './input';

import {targetValue} from '../lib/helpers';
import * as ValuesActions from '../actions/values-actions';

var ControlFreakValues = React.createClass({
  mixins: [State.mixin],
  cursors: {
    artist: ['values', 'artist'],
    charity: ['values', 'charity'],
    stereoCause: ['values', 'stereoCause']
  },

  updateArtist: targetValue(ValuesActions.updateArtist(State)),
  updateCharity: targetValue(ValuesActions.updateCharity(State)),
  updateStereoCause: targetValue(ValuesActions.updateStereoCause(State)),

  render: function() {
    return <div>
      <DividingOptions />

      <div className="container-custom-value">
        <div className="label-custom-donate">
          contribute $
        </div>
        <div className="label-custom-value">
          to artists
        </div>
        <input defaultValue={ this.cursors.artist.get() / 100 }
               onBlur={ this.updateArtist }
               type="text"
               className="input-custom-value" />
      </div>

      <div className="container-custom-value">
        <div className="label-custom-donate">
          contribute $
        </div>
        <div className="label-custom-value">
          to charities
        </div>
        <input defaultValue={ this.cursors.charity.get() / 100 }
               onBlur={ this.updateCharity }
               type="text"
               className="input-custom-value" />
      </div>

      <div className="container-custom-value">
        <div className="label-custom-donate">
          contribute $
        </div>
        <div className="label-custom-value">
          to Stereo Cause
        </div>
        <input defaultValue={ this.cursors.stereoCause.get() / 100 }
               onBlur={ this.updateStereoCause }
               type="text"
               className="input-custom-value" />
      </div>
    </div>
  }
});

export default ControlFreakValues;