import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../../ui/App.jsx';;
import Contact from '../../ui/Contact.jsx';
import About from '../../ui/About.jsx';
import FeaturedItems from '../../ui/FeaturedItems.jsx';
import TopNew from '../../ui/TopNew.jsx';
import Top10 from '../../ui/Top10.jsx';
import Category from '../../ui/Category.jsx';
import Item from '../../ui/Item.jsx';
import Search from '../../ui/Search.jsx';
import NotFound from '../../ui/NotFound.jsx';

import Admin from '../../ui/admin/Admin.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={FeaturedItems} />
      <Route path="/toptaze" component={TopNew}/>
      <Route path="/top10" component={Top10}/>
      <Route path="/category/:categorySlug" component={Category}/>
      <Route path="/item/:appId" component={Item}/>
      <Route path="/about" component={About}/>
    </Route>
    <Route path="/search" component={Search}/>
    <Route path="/ayratynzehinz" component={Admin}/>
    <Route path="*" component={NotFound} />
  </Router>
);