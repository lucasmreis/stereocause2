import React from '../react';

import FormHeader from './form-header';
import ControlFreakValues from './control-freak-values';
import EmailAndOptions from './email-and-options';
import CreditCard from './credit-card';
import Submit from './submit';

var ControlFreakForm = React.createClass({
  render: function() {
    return <div>
      <FormHeader />
      <div className="form-container">
        <ControlFreakValues />
        <EmailAndOptions />
        <CreditCard />
        <Submit />
      </div>
    </div>
  }
});

export default ControlFreakForm;