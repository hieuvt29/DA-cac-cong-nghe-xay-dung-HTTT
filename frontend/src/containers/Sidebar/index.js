import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reqCategories } from './actions';
import '../..//App.css';

class Sidebar extends Component {
    componentWillMount() {
        // this.props.reqCategories();
    }
    render() {
        return (
            <div className="App">
                {console.log('---TuyenTN---', this.props.resCategories)}
                <div id="sidebar" className="span3">
                    <div className="well well-small">
                        <Link to="/product_summary" id="myCart"><img src="themes/images/ico-cart.png" alt="cart" />{this.props.cartQuantity} Sản phẩm
                        <span className="badge badge-warning pull-right">{ this.props.cartTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }đ</span>
                        </Link>
                    </div>
                    <ul id="sideManu" className="nav nav-tabs nav-stacked">
                        {this.props.resCategories? this.props.resCategories.map((cat, index) => (
                        <li className="subMenu open" key={index}>
                        <Link to={`/category/${cat.categoryId}`}> {cat.categoryName}</Link>
                            <ul>
                                {/* <li><a className="active" href="products.html"><i className="icon-chevron-right"></i>Cameras (100) </a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Computers, Tablets & laptop (30)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Mobile Phone (80)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Sound & Vision (15)</a></li> */}
                            </ul>
                        </li>
                        )): null}
                        
                    </ul>
                    <br />
                    {/* <div className="thumbnail">
                        <img src="themes/images/products/panasonic.jpg" alt="Bootshop panasonoc New camera" />
                        <div className="caption">
                            <h5>Panasonic</h5>
                            <h4 style= {{ textAlign:"center" }}><a className="btn" href="product_details.html"> <i className="icon-zoom-in"></i></a> <a className="btn" href="">Add to <i className="icon-shopping-cart"></i></a> <a className="btn btn-primary" href="">$222.00</a></h4>
                        </div>
                    </div><br />
                    <div className="thumbnail">
                        <img src="themes/images/products/kindle.png" title="Bootshop New Kindel" alt="Bootshop Kindel" />
                        <div className="caption">
                            <h5>Kindle</h5>
                            <h4 style={{ textAlign:"center" }}><a className="btn" href="product_details.html"> <i className="icon-zoom-in"></i></a> <a className="btn" href="">Add to <i className="icon-shopping-cart"></i></a> <a className="btn btn-primary" href="">$222.00</a></h4>
                        </div>
                    </div><br />
                    <div className="thumbnail">
                        <img src="themes/images/payment_methods.png" title="Bootshop Payment Methods" alt="Payments Methods" />
                        <div className="caption">
                            <h5>Payment Methods</h5>
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.appReducer.account,
    cartTotal: state.appReducer.cartTotal,
    cartQuantity: state.appReducer.cartQuantity,
    resCategories: state.appReducer.resCategories,    
  });

const mapDispatchToProps = ({
    reqCategories,
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
