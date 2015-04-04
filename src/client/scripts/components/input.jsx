import R from 'ramda';
import React from '../react';
import ReactMaskMixin from 'react-mask-mixin';

var Input = React.createClass({
  mixins: [ReactMaskMixin],
  render: function() {
    return <input {...this.props} {...this.mask.props} />
  }
});

export default Input;