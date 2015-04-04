import R from 'ramda';
import cause from '../../cause';
import React from 'react';
import ScForm from './components/sc-form';
import ArtistDetails from './components/artist-details';
import * as DetailsActions from './actions/details-actions';

window.Stripe.setPublishableKey('pk_test_QQhIbJNHgGEhKuggj9TiikYi');

React.render(
  <ScForm />,
  document.getElementById('sc-form')
);

React.render(
  <ArtistDetails />,
  document.getElementById('sc-artist-details')
);

const addClickListener = id => document
  .getElementById(id)
  .addEventListener('click',
    () => DetailsActions.showDetails(id) );

const compose = R.compose;
const map = R.map;
const pluck = R.pluck;
const prop = R.prop;

compose(
  map(addClickListener),
  pluck('id'),
  prop('albums')
  )(cause);