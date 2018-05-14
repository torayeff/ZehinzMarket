import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { renderRoutes } from '../imports/startup/client/routes.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

analytics.track("zMarket Visitors");

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById("app"));
})