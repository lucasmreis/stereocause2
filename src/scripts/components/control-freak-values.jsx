import React from 'react';

import DividingOptions from './dividing-options';

var ControlFreakValues = React.createClass({
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
        <input type="text"
               className="input-custom-value" />
      </div>

      <div className="container-custom-value">
        <div className="label-custom-donate">
          contribute $
        </div>
        <div className="label-custom-value">
          to charities
        </div>
        <input type="text"
               className="input-custom-value" />
      </div>

      <div className="container-custom-value">
        <div className="label-custom-donate">
          contribute $
        </div>
        <div className="label-custom-value">
          to Stereo Cause
        </div>
        <input type="text"
               className="input-custom-value" />
      </div>
    </div>
  }
});

export default ControlFreakValues;