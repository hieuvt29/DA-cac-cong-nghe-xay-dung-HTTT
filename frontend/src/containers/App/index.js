import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../HomePage';
import Contact from '../Contact';
import NotFound from '../NotFound';

import '../..//App.css';
import '../../css/themes/bootshop/bootstrap.min.css';
import '../../css/themes/css/base.css';
import '../../css/themes/css/bootstrap-responsive.min.css';
import '../../css/themes/css/font-awesome.css';
import '../../css/themes/js/google-code-prettify/prettify.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/contact" component={Contact} />
            <Route path="" component={NotFound} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
