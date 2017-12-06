import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin, initCart, initAccount, signout, search, reqCategories } from './actions';
// import logo from '../../logo.svg';
import '../..//App.css';
import $ from 'jquery';
import { setCookie, getCookie } from '../../globalFunc';

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

  componentDidMount() {
    // $("#loginBtn").click(() => {
    //   $("#login").toggle();
    // });
    // $(".closeLogin").click(() => {
    //   $("#login").fadeOut(0);
    // });
    // console.log('---didmount Account---', this.props.account);
    this.props.initCart();
    this.props.initAccount();
    this.props.reqCategories();
  }

  signin = () => {
    this.props.signin(this.state.username, this.state.password);
    (this.props.errorLogin) ? this.setState({ openLogin: false }) : null;
    // const url = 'http://localhost:3001/login';
    // const req_body = {
    //   userName: this.state.username,
    //   password: this.state.password,
    // }
    // fetch(url, {
    //   method: 'POST',
    //   body: req_body,
    // })
    // .then(response => { console.log('---RES = ---', response);})
    // .then(responseJson => console.log('---TuyenTN---bafvvhas', responseJson))
  }

  search = () => {
    
    this.props.search(this.state.searchKey);
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
                {(this.props.account.userName)? (<span><a style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={ () => this.props.signout() }>  [Đăng xuất]</a></span>): ''}
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
                <Link className="brand" to="/"><img src="themes/images/logo.png" alt="Bootsshop" /></Link>
                <form className="form-inline navbar-search" disabled="disabled">
                  <input id="srchFld" className="srchTxt" type="text" name="searchKey" onChange={this.change} value={this.state.searchKey} />
                  <select className="srchTxt">
                    <option>Tất cả</option>
                    <option>Laptop </option>
                    <option>Điện thoại di động </option>
                    <option>PC và linh kiện </option>
                    <option>Máy tính bảng </option>
                    <option>Phụ kiện </option>
                  </select>
                </form>
                <button id="submitButton" className="btn btn-primary" onClick={ this.search }>Go</button>
                <ul id="topMenu" className="nav pull-right">
                  <li className=""><a href="special_offer.html">Khuyến mại </a></li>
                  <li className=""><a href="normal.html">Tin tức</a></li>
                  <li className=""><a href="contact.html">Hỗ trợ</a></li>
                  {(!this.props.account.userName)? (
                    <li className="">
                    <a id="loginBtn" role="button" data-toggle="modal" style={{ paddingRight:0 }}
                      onClick={() => this.setState({ openLogin: true })}
                    >
                      <span className="btn btn-large btn-success"> Đăng nhập </span>
                    </a>
                    {this.state.openLogin && <div id="login" className={"modal fade in"} tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" >
                      <div className="modal-header">
                        <button type="button" className="close closeLogin" onClick={() => this.setState({ openLogin: false })} data-dismiss="modal" aria-hidden="true">×</button>
                        <h3> Đăng nhập </h3>
                      </div>
                      <div className="modal-body">
                        <span> { this.props.errorLogin } </span>
                        <form className="form-horizontal loginFrm">
                          <div className="control-group">
                            <input type="text" id="inputUsername" name="username" onChange={this.change} placeholder="Tên đăng nhập" value={this.state.username} />
                          </div>
                          <div className="control-group">
                            <input type="password" id="inputPassword" name="password" onChange={this.change} placeholder="Mật khẩu" value={this.state.password} />
                          </div>
                          <div className="control-group">
                            <label className="checkbox">
                              <input type="checkbox" /> <span>Ghi nhớ</span>
				                    </label>
                          </div>
                        </form>
                        <button className="input-group-btn">
                          <Link to="/signup" onClick={ () => {$("#login").fadeOut(0);} }> Đăng kí </Link>
                        </button>
                        <button type="submit" onClick={this.signin} className="btn btn-success"> Đăng nhập </button>
                        <button className="btn closeLogin" onClick={() => this.setState({ openLogin: false })} data-dismiss="modal" aria-hidden="true"> Đóng </button>
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
});

const mapDispatchToProps = ({
  signin, initCart, initAccount, signout, search, reqCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);