import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin, initCart, initAccount, signout, search, reqCategories, reqSuppliers } from './actions';
// import logo from '../../logo.svg';
import '../..//App.css';
import $ from 'jquery';
// import { setCookie, getCookie } from '../../globalFunc';
import { address } from '../../config.js';
import PropTypes from "prop-types";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      searchKey: '',
      openLogin: false,
      cssOpenLogin: "modal hide fade in",
    };
  }
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.props.initCart();
    this.props.initAccount();
    this.props.reqCategories();
    this.props.reqSuppliers();
  }

  signin = () => {
    this.props.signin(this.state.username, this.state.password);
    setTimeout(()=> {
      if (!this.props.errorLogin) {
        this.setState({ openLogin: false });
        window.location.reload();
      }
    }, 500);
  }

  search = () => {
    // this.props.search(this.state.searchKey);
    this.context.router.history.push('/?searchKey=' + this.state.searchKey);
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
              <div className="span6">Chào mừng <strong> {(this.props.account.userName)? (this.props.account.userName):  'Guest' } !</strong>
                {(this.props.account.userName)? (<span><a style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={ () => {this.props.signout(); this.context.router.history.push('/');} }>  [Đăng xuất]</a></span>): ''}
              </div>
              <div className="span6">
                <div className="pull-right">
                  <span className="btn btn-mini">En</span>
                  <span className="btn btn-mini">{ this.props.cartTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</span>
                  <Link to="/product_summary"><span className="">đ </span></Link>
                  <Link to="/product_summary">
                    <span className="btn btn-mini btn-primary">
                      <i className="icon-shopping-cart icon-white"></i>
                      [ { this.props.cartQuantity } ] sản phẩm
                    </span>
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
                <Link className="brand" to="/"><img src={window.location.origin + "/themes/images/logo.png"} alt="Bootsshop" /></Link>
                <form className="form-inline navbar-search" disabled="disabled" onSubmit={e => e.preventDefault()}>
                  <input className="srchTxt" type="text" name="searchKey" onKeyPress={e => e.key == 'Enter'? this.search(): null} onChange={this.change} value={this.state.searchKey}  />
                </form>
                <button to="/" id="submitButton" className="btn btn-primary" onClick={ this.search }>Tìm kiếm</button>
                  {(!this.props.account.userName)? (
                    <ul id="topMenu" className="nav pull-right">
                      <li className="">
                        <a id="loginBtn" role="button" data-toggle="modal" style={{ paddingRight:0 }}
                          onClick={() => this.setState({ openLogin: true })}>
                          <span className="btn btn-large btn-success"> Đăng nhập </span>
                        </a>
                        {this.state.openLogin && <div id="login" className={"modal fade in"} tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" >
                          <div className="modal-header">
                            <button type="button" className="close closeLogin" onClick={() => this.setState({ openLogin: false })} data-dismiss="modal" aria-hidden="true">×</button>
                            <h3> Đăng nhập </h3>
                          </div>
                          <div className="modal-body">
                            <strong><span> { this.props.errorLogin} </span></strong>
                            <form className="form-horizontal loginFrm">
                              <div className="control-group">
                                <input type="text" id="inputUsername" name="username" onChange={this.change} placeholder="Tên đăng nhập" value={this.state.username} />
                              </div>
                              <div className="control-group">
                                <input type="password" id="inputPassword" name="password" onKeyPress={e => e.key == 'Enter'? this.signin(): null} onChange={this.change} placeholder="Mật khẩu" value={this.state.password} />
                              </div>
                              <div className="control-group">
                                <label className="checkbox">
                                  <input type="checkbox" /> <span>Ghi nhớ</span>
                                </label>
                              </div>
                            </form>
                            <div className="btn-group">
                              <Link to="/signup" onClick={ () => {$("#login").fadeOut(0);} }>
                              <button className="closeLogin btn input-group-btn" onClick={() => this.setState({ openLogin: false })} data-dismiss="modal">Đăng ký</button>
                              </Link>
                              <button onClick={this.signin} className="btn btn-success"> Đăng nhập </button>
                              <button className="btn closeLogin" onClick={() => this.setState({ openLogin: false })} data-dismiss="modal" aria-hidden="true"> Đóng </button>
                            </div>
                          </div>
                        </div>}
                      </li>
                    </ul>
                  ) : (
                    <ul id="topMenu" className="nav pull-right">
                      <li><Link to="/customer/orders">Danh sách đơn hàng</Link></li>
                      <li><Link to="/customer/profile">Thông tin cá nhân</Link></li>
                    </ul>
                  )}
              </div>
            </div>
          </div>
        </div>
        {this.state.openLogin && <div
          id="manhinhtoi"
          onClick={() => {
            this.setState({ openLogin: false });
          }}
          className="modal-backdrop fade in"></div> }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.appReducer.account,
  cartTotal: state.appReducer.cartTotal,
  cartQuantity: state.appReducer.cartQuantity,
  errorLogin: state.appReducer.errorLogin,
  resCategories: state.appReducer.resCategories,
  resSuppliers: state.appReducer.resSuppliers
});

const mapDispatchToProps = ({
  signin, initCart, initAccount, signout, search, reqCategories, reqSuppliers
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);