import React from '../react';
import State from '../state';
import {avg} from '../lib/stats';

var FormHeader = React.createClass({
  mixins: [State.mixin],
  cursor: ['stats'],
  render: function() {
    return <div>
      <p className="section-title">Contribute!</p>
      <p className="section-body">
        Decide how much you want to contribute and where the money goes to: artists, causes and us. Then download the music and <a href="#">#spreadthelove</a>.
        Giving more than the average contribution of <strong>${ avg(this.state.cursor) }</strong> gets you all six albums.
      </p>
    </div>
  }
});

export default FormHeader;