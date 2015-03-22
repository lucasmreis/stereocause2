import React from 'react';
import State from '../state';

var ScForm = React.createClass({
  mixins: [State.mixin],
  cursor: ['showing'],
  render: function() { 
    return <div className="container">
      <p>{ this.state.cursor }</p>
      <p className="section-title">Contribute!</p>
      <p className="section-body">
        Decide how much you want to contribute and where the money goes to: artists, causes and us. Then download the music and <a href="#">#spreadthelove</a>.
        Giving more than the average contribution of <strong>11.50</strong> gets you all six albums.   
      </p>
    </div>
  }
});

export default ScForm;