import React from "react";
import $ from 'jquery';

class Content extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      bestSoldProducts: [],
    }
  }
  componentWillMount () {
    console.log('Dashboard MOUNT');
    $.get('/best-seller-products', res => {
      // console.log("best sold products: ", res);
      this.setState({bestSoldProducts: res.products});
      // console.log('---TuyenTN---', this.state.bestSoldProducts);
    });
  }

  componentWillUnmount () {
    console.log('Dashboard  UNMOUNT');
  }
  componentDidMount () {
    console.log('Dashboard Did MOUNT');
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
                  <span className="info-box-number"></span>
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
                  <span className="info-box-number"></span>
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
                  <span className="info-box-number">20,000</span>
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
            <div className="col-md-8">
              {}
              <div className="box box-success">
                <div className="box-header with-border">
                  <h3 className="box-title">Visitors Report</h3>
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
                <div className="box-body no-padding">
                  <div className="row">
                    <div className="col-md-9 col-sm-8">
                      <div className="pad">
                        {}
                        <div
                          id="world-map-markers"
                          style={{
                            height: 325
                          }}
                        />
                      </div>
                    </div>
                    {}
                    <div className="col-md-3 col-sm-4">
                      <div
                        className="pad box-pane-right bg-green"
                        style={{
                          minHeight: 280
                        }}
                      >
                        <div className="description-block margin-bottom">
                          <div className="sparkbar pad" data-color="#fff">
                            90,70,90,70,75,80,70
                          </div>
                          <h5 className="description-header">8390</h5>
                          <span className="description-text">Visits</span>
                        </div>
                        {}
                        <div className="description-block margin-bottom">
                          <div className="sparkbar pad" data-color="#fff">
                            90,50,90,70,61,83,63
                          </div>
                          <h5 className="description-header">30%</h5>
                          <span className="description-text">Referrals</span>
                        </div>
                        {}
                        <div className="description-block">
                          <div className="sparkbar pad" data-color="#fff">
                            90,50,90,70,61,83,63
                          </div>
                          <h5 className="description-header">70%</h5>
                          <span className="description-text">Organic</span>
                        </div>
                        {}
                      </div>
                    </div>
                    {}
                  </div>
                  {}
                </div>
                {}
              </div>
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
