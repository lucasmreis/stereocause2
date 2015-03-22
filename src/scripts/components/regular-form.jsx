import React from 'react';

import FormHeader from './form-header';
import TotalAndProportions from './total-and-proportions';
import EmailAndOptions from './email-and-options';
import CreditCard from './credit-card';
import Submit from './submit';

var RegularForm = React.createClass({
  render: function() {
    return <div>
      <FormHeader />
      <TotalAndProportions />
      <EmailAndOptions />
      <CreditCard />
      <Submit />
    </div>
  }
});

export default RegularForm;