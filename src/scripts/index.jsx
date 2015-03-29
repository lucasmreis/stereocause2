import React from 'react';
import ScForm from './components/sc-form';
import ArtistDetails from './components/artist-details';

window.Stripe.setPublishableKey('pk_test_QQhIbJNHgGEhKuggj9TiikYi');

React.render(
  <ScForm />,
  document.getElementById('sc-form')
);

React.render(
  <ArtistDetails />,
  document.getElementById('sc-artist-details')
);