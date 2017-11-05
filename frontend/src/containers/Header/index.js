import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from './actions';
// import logo from '../../logo.svg';
import '../..//App.css';
import $ from 'jquery';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      openLogin: false,
      cssOpenLogin: "modal hide fade in",
    };
  }

  componentDidMount() {
    // $("#loginBtn").click(() => {
    //   $("#login").toggle();
    // });
    // $(".closeLogin").click(() => {
    //   $("#login").fadeOut(0);
    // });
  }

  signin = () => {
    // this.props.signin(this.state.username, this.state.password);
    const url = 'http:localhost:3001/signin';
    const req_body = {
      userName: this.state.username,
      password: this.state.password,
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req_body),
    })
    .then(response => response.json())
    .then(responseJson => console.log('---TuyenTN---bafvvhas', responseJson))
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <header className="App-header">
        <div id="header">
          <div className="container">
            <div id="welcomeLine" className="row">
              <div className="span6">Welcome!<strong> {(this.props.account.username !== '')? (this.props.account.fistname + this.props.account.lastname):  'Guest' }</strong></div>
              <div className="span6">
                <div className="pull-right">
                  <a href="product_summary.html"><span className="">Fr</span></a>
                  <a href="product_summary.html"><span className="">Es</span></a>
                  <span className="btn btn-mini">En</span>
                  <a href="product_summary.html"><span>&pound;</span></a>
                  <span className="btn btn-mini">$155.00</span>
                  <Link to="/product_summary"><span className="">$</span></Link>
                  <Link to="/product_summary">
                    <span className="btn btn-mini btn-primary"><i className="icon-shopping-cart icon-white"></i> [ 3 ] Itemes in your cart </span>
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- Navbar ================================================== --> */}
            <div id="logoArea" className="navbar">
              <a id="smallScreen" data-target="#topMenu" data-toggle="collapse" className="btn btn-navbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </a>
              <div className="navbar-inner">
                <Link className="brand" to="/"><img src="themes/images/logo.png" alt="Bootsshop" /></Link>
                <form className="form-inline navbar-search" method="post" action="products.html" >
                  <input id="srchFld" className="srchTxt" type="text" />
                  <select className="srchTxt">
                    <option>All</option>
                    <option>CLOTHES </option>
                    <option>FOOD AND BEVERAGES </option>
                    <option>HEALTH & BEAUTY </option>
                    <option>SPORTS & LEISURE </option>
                    <option>BOOKS & ENTERTAINMENTS </option>
                  </select>
                  <button type="submit" id="submitButton" className="btn btn-primary">Go</button>
                </form>
                <ul id="topMenu" className="nav pull-right">
                  <li className=""><a href="special_offer.html">Specials Offer</a></li>
                  <li className=""><a href="normal.html">Delivery</a></li>
                  <li className=""><a href="contact.html">Contact</a></li>
                  {(this.props.account.username === '')? (
                    <li className="">
                    <a id="loginBtn" role="button" data-toggle="modal" style={{ paddingRight:0 }}
                      onClick={() => this.setState({ openLogin: true })}
                    >
                      <span className="btn btn-large btn-success">Login</span>
                    </a>
                    {this.state.openLogin && <div id="login" className={"modal fade in"} tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" >
                      <div className="modal-header">
                        <button type="button" className="close closeLogin" onClick={() => this.setState({ openLogin: false })} data-dismiss="modal" aria-hidden="true">×</button>
                        <h3>Login</h3>
                      </div>
                      <div className="modal-body">
                        <form className="form-horizontal loginFrm">
                          <div className="control-group">
                            <input type="text" id="inputUsername" name="username" onChange={this.change} placeholder="Username" value={this.state.username} />
                          </div>
                          <div className="control-group">
                            <input type="password" id="inputPassword" name="password" onChange={this.change} placeholder="Password" value={this.state.password} />
                          </div>
                          <div className="control-group">
                            <label className="checkbox">
                              <input type="checkbox" /> <span>Remember me</span>
				                    </label>
                          </div>
                        </form>
                        <button className="input-group-btn">
                          <Link to="/signup" onClick={ () => {$("#login").fadeOut(0);} }>Sign Up</Link>
                        </button>
                        <button type="submit" onClick={this.signin} className="btn btn-success">Sign in</button>
                        <button className="btn closeLogin" onClick={() => this.setState({ openLogin: false })} data-dismiss="modal" aria-hidden="true">Close</button>
                      </div>
                    </div>}
                  </li>
                  ) : null
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.openLogin && <div
          id="manhinhtoi"
          onClick={() => {
            this.setState({ openLogin: false });
          }}
          class="modal-backdrop fade in"></div> }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.appReducer.account,
});

const mapDispatchToProps = ({
  signin,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);