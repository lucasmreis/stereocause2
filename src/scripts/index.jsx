import React from 'react';
import ScForm from './components/sc-form';

window.Stripe.setPublishableKey('pk_test_QQhIbJNHgGEhKuggj9TiikYi');

React.render(
  <ScForm />,
  document.getElementById('sc-form')
);