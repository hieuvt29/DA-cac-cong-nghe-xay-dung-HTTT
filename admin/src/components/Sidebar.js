import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from '../globalFunc';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      account: {},
    }
  }

  componentDidMount() {
    // setCookie('account', '');
    const acc = getCookie('account');
    if(acc) {
      // console.log('---ACC =---', JSON.parse(acc));
      this.setState({ account: JSON.parse(acc)});
    }
    // console.log('---Header this state acc =  ', this.state.account);
  }

  render() {
    return (
      <aside className="main-sidebar">
        {}
        <section className="sidebar">
          {}
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle"
                alt="User"
              />
            </div>
            <div className="pull-left info">
              <p>{this.state.account.firstName + " " + this.state.account.lastName}</p>
              <Link to="/admin">
                <i className="fa fa-circle text-success" /> Online
              </Link>
            </div>
          </div>
          {}
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder="Search..."
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  name="search"
                  id="search-btn"
                  className="btn btn-flat"
                >
                  <i className="fa fa-search" />
                </button>
              </span>
            </div>
          </form>
          {}
          {}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>
            <li >
              <Link to="/admin/dashboard">
                <i className="fa fa-dashboard" /> <span>Dashboard</span>
                <span className="pull-right-container">
                </span>
              </Link>
            </li>
            <li>
                <Link to="/admin/account-manager">
                  <i className="fa fa-th" /> <span>Account Manager</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
            </li>
            <li>
                <Link to="/admin/product-manager">
                  <i className="fa fa-th" /> <span>Product Manager</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
            </li>
            <li>
                <Link to="/admin/category-manager">
                  <i className="fa fa-th" /> <span>Category Manager</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
            </li>
            <li>
                <Link to="/admin/supplier-manager">
                  <i className="fa fa-th" /> <span>Supplier Manager</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
            </li>
            <li>
                <Link to="/admin/order-manager">
                  <i className="fa fa-th" /> <span>Order Manager</span>
                  <span className="pull-right-container">
                    <small className="label pull-right bg-green">new</small>
                  </span>
                </Link>
            </li>
          </ul>
        </section>
        {}
      </aside>
    );
  }
}

export default Sidebar;
