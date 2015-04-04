import React from '../react';

import FormHeader from './form-header';
import TotalAndProportions from './total-and-proportions';
import EmailAndOptions from './email-and-options';
import CreditCard from './credit-card';
import Submit from './submit';

var RegularForm = React.createClass({
  render: function() {
    return <div>
      <FormHeader />
      <div className="form-container">
        <TotalAndProportions />
        <EmailAndOptions />
        <CreditCard />
        <Submit />
      </div>
    </div>
  }
});

export default RegularForm;