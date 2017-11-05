import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import HomePage from '../HomePage';
import Contact from '../Contact';
import Signup from '../Signup';
import NotFound from '../NotFound';
import ProductDetail from '../ProductDetail';
import Cart from '../Cart';

import '../..//App.css';

import { getCookie, setCookie } from '../../globalFunc';

class App extends Component {
  componentDidMount() {
    setCookie('username', 'heo');
    setCookie('age', '');
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Sidebar/>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/contact" component={Contact} />
            <Route path="/signup" component={Signup} />
            <Route path="/product_summary" component={Cart} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="" component={NotFound} />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
