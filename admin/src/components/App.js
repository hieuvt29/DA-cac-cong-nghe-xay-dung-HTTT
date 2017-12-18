import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import ControlSidebar from "./ControlSidebar";
import { Route, Switch, withRouter } from 'react-router-dom';
import AccountManager from './Account/AccountManager';
import ProductManager from './Product/ProductManager';
import CategoryManager from './Category/CategoryManager';
import SupplierManager from './Supplier/SupplierManager';
import OrderManager from './Order/OrderManager';
import Login from './Login/index';
import { getCookie } from '../globalFunc';

class Wrapper extends React.Component {
  
  render() {
    if (getCookie('account') !== '') {
      return (
        <div className="wrapper">
          <Header />
          {}
          <Sidebar />
          {}

          <Switch>
            <Route path='/admin/account-manager' component={AccountManager} />
            <Route path='/admin/product-manager' component={ProductManager} />
            <Route path='/admin/category-manager' component={CategoryManager} />
            <Route path='/admin/supplier-manager' component={SupplierManager} />
            <Route path='/admin/order-manager' component={OrderManager} />
            <Route path='/admin' component={Dashboard} />
          </Switch>
          {}
          <Footer />
          {}
          <ControlSidebar />
        </div>
      );
  } else {
    return (
      <div className="wrapper">
        <Switch>
            <Route path='/account-manager' component={Login} />
            <Route path='/product-manager' component={Login} />
            <Route path='/category-manager' component={Login} />
            <Route path='/supplier-manager' component={Login} />
            <Route path='/order-manager' component={Login} />
            <Route path='' component={Login} />
          </Switch>
      </div>
    );
  } 
  }
}

export default withRouter(Wrapper);
