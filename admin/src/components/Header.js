import React from "react";
import { getCookie, setCookie } from '../globalFunc';

class Header extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      account: {},
    }
  }

  componentDidMount() {
    const acc = getCookie('account');
    console.log('---ACC =---', JSON.parse(acc));
    if(acc) {
      this.setState({ account: JSON.parse(acc)});
    }
    console.log('---Header this state acc =  ', this.state.account);
  }

  signout = () => {
    setCookie('account', '');
    this.props.history.push('/');
  }
  render() {
    return (
      <header className="main-header">
        {}
        <a href="index2.html" className="logo">
          {}
          <span className="logo-mini">
            <b>A</b>LT
          </span>
          {}
          <span className="logo-lg">
            <b>Admin</b>Bootshop
          </span>
        </a>
        {}
        <nav className="navbar navbar-static-top">
          {}
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          {}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {}
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="dist/img/user2-160x160.jpg"
                    className="user-image"
                    alt="User Image"
                  />
                  <span className="hidden-xs">{this.state.account.firstName + ' ' + this.state.account.lastName}</span>
                </a>
                <ul className="dropdown-menu">
                  {}
                  <li className="user-header">
                    <img
                      src="dist/img/user2-160x160.jpg"
                      className="img-circle"
                      alt="User Image"
                    />
                    <p>
                    {this.state.account.firstName + ' ' + this.state.account.lastName}
                      <small>Admin</small>
                    </p>
                  </li>
                  {}
                  <li className="user-footer">
                    <div className="pull-right">
                      <button className="btn btn-default btn-flat" onClick={this.signout}>
                        Sign out
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
