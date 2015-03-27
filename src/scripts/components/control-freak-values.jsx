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

  updateArtist: function(x) { this.handleChange('artist')(ValuesActions.updateArtist(State)(x.target.value)) },
  updateCharity: function(x) { this.handleChange('charity')(ValuesActions.updateCharity(State)(x.target.value)) },
  updateStereoCause: function(x) { this.handleChange('stereoCause')(ValuesActions.updateStereoCause(State)(x.target.value)) },

  handleChange: function(field, targetValue) {
    var self = this;
    return function(x) {
      var c = {};
      c[field] = targetValue ? x.target.value : x;
      self.setState(c);
    };
  },

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
        <input defaultValue={ (this.cursors.artist.get() / 100).toFixed(2).toString() }
               onBlur={ this.updateArtist }
               value={ this.state.artist }
               onChange={ this.handleChange('artist', true) }
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
        <input defaultValue={ (this.cursors.charity.get() / 100).toFixed(2).toString() }
               onBlur={ this.updateCharity }
               value={ this.state.charity }
               onChange={ this.handleChange('charity', true) }
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
        <input defaultValue={ (this.cursors.stereoCause.get() / 100).toFixed(2).toString() }
               onBlur={ this.updateStereoCause }
               value={ this.state.stereoCause }
               onChange={ this.handleChange('stereoCause', true) }
               type="text"
               className="input-custom-value" />
      </div>
    </div>
  }
});

export default ControlFreakValues;