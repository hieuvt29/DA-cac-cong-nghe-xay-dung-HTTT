import React from "react";
import $ from 'jquery';

class Content extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bestSoldProducts: [],
      activeCustomers: [],
      numberProducts: 0,
      numberAccounts: 0,
      numberOrders: 0,
    }
  }
  componentWillMount () {
    // console.log('Dashboard MOUNT');
    $.get('/best-seller-products', res => {
      if(res.products){
        this.setState({bestSoldProducts: res.products});
      }
    });
    $.get('/active-customers', res => {
      if(res.customers){
        this.setState({activeCustomers: res.customers});
      }
    });
    $.get('/customers', res => {
      if (res.accounts) {
        this.setState({ numberAccounts: res.accounts.length });
      }
    });
    $.ajax({
      url: '/orders',
      method: 'GET'
    }).then(res => {
      if (res.orders) {
        this.setState({ numberOrders: res.orders.length });
      }
      });
    $.ajax({
      url: '/products',
      method: 'GET'
    }).then(res => {
      if (res.products) {
        this.setState({ numberProducts: res.products.length });
      }
    });
  }

  componentWillUnmount () {
    // console.log('Dashboard  UNMOUNT');
  }
  componentDidMount () {
    // console.log('Dashboard Did MOUNT');
  }

  render() {
    return (
      <div className="content-wrapper">
        {}
        <section className="content-header">
          <h1>
            Dashboard
            <small>Version 2.0</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="#">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li className="active">Dashboard</li>
          </ol>
        </section>
        {}
        <section className="content">
          {}
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
                <span className="info-box-icon bg-aqua">
                  <i className="ion ion-ios-gear-outline" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Traffic</span>
                  <span className="info-box-number">
                    90<small>%</small>
                  </span>
                </div>
                {}
              </div>
              {}
            </div>
            {}
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
                <span className="info-box-icon bg-aqua">
                  <i className="ion ion-ios-gear-outline" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Sản phẩm</span>
                  <span className="info-box-number">{this.state.numberProducts}</span>
                </div>
                {}
              </div>
              {}
            </div>
            {}
            <div className="clearfix visible-sm-block" />
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
                <span className="info-box-icon bg-green">
                  <i className="ion ion-ios-cart-outline" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Đơn hàng</span>
                  <span className="info-box-number">{this.state.numberOrders}</span>
                </div>
                {}
              </div>
              {}
            </div>
            {}
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="info-box">
                <span className="info-box-icon bg-yellow">
                  <i className="ion ion-ios-people-outline" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text"> Số thành viên</span>
                  <span className="info-box-number">{this.state.numberAccounts}</span>
                </div>
                {}
              </div>
              {}
            </div>
            {}
          </div>
          {}
          {}
          <div className="row">
            {}
            <div className="col-md-12">
              {}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Sản phẩm bán chạy</h3>
                  <div className="box-tools pull-right">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="remove"
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
                {}
                <div className="box-body">
                  <div className="table-responsive">
                    <table className="table no-margin">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên sản phẩm</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.bestSoldProducts.map((product, index) => (
                          <tr>
                            <td>
                              {index}
                            </td>
                            <td>{product.productName}</td>
                            <td>
                              <span className="label label-success">{product.price}</span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#00a65a"
                                data-height={20}
                              >
                                {product.numProducts}
                            </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {}
                </div>
                {}
              </div>
              {}
              <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Khách hàng mua nhiều</h3>
                  <div className="box-tools pull-right">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="remove"
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
                {}
                <div className="box-body">
                  <div className="table-responsive">
                    <table className="table no-margin">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên khách hàng </th>
                          <th>Số điện thoại </th>
                          <th>Địa chỉ</th>
                          <th>Số lượng Order</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.activeCustomers.map((customer, index) => (
                          <tr>
                            <td>
                              {index}
                            </td>
                            <td>{(customer.Account)? customer.Account.firstName + customer.Account.lastName: 'khach '+index}</td>
                            <td>
                              <span>{(customer.Account)? customer.Account.telephone: ''}</span>
                            </td>
                            <td>
                              <span>{(customer.Account)? customer.Account.address: ''}</span>
                            </td>
                            <td><span className="label label-success">{(customer.Account)? customer.numOrders: ''}</span></td>
        
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {}
                </div>
                {}
              </div>
              {}
            </div>
            
            {}
          </div>
          {}
        </section>
        {}
      </div>
    );
  }
}

export default Content;
