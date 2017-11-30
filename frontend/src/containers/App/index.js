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
// import Demo from '../Demo';

import '../..//App.css';

import { getCookie, setCookie } from '../../globalFunc';

class App extends Component {
  componentDidMount() {
    if (getCookie('username') === '') setCookie('username', 'heo');
    if (getCookie('age') === '') setCookie('age', '');
    if (getCookie('cart') === '') setCookie('cart', '');
    if (getCookie('cartQuantity') === '') setCookie('cartQuantity', '0');
    if (getCookie('cartTotal') === '') setCookie('cartTotal', '0.0');
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
    console.log('Index App -> this.state.prevPath', this.state.prevPath);
  }
}

export default App;
