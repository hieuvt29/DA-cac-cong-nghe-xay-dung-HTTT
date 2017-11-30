import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../..//App.css';

class Sidebar extends Component {
    render() {
        return (
            <div className="App">
                <div id="sidebar" className="span3">
                    <div className="well well-small"><Link to="/product_summary" id="myCart"><img src="themes/images/ico-cart.png" alt="cart" />{this.props.cartQuantity} Sản phẩm
                        <span className="badge badge-warning pull-right">{ this.props.cartTotal }đ</span></Link>
                    </div>
                    <ul id="sideManu" className="nav nav-tabs nav-stacked">
                        <li className="subMenu open"><a> ELECTRONICS [230]</a>
                            <ul>
                                <li><a className="active" href="products.html"><i className="icon-chevron-right"></i>Cameras (100) </a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Computers, Tablets & laptop (30)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Mobile Phone (80)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Sound & Vision (15)</a></li>
                            </ul>
                        </li>
                        <li className="subMenu"><a> CLOTHES [840] </a>
                            <ul style={{ display:"none" }}>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Women's Clothing (45)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Women's Shoes (8)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Women's Hand Bags (5)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Men's Clothings  (45)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Men's Shoes (6)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Kids Clothing (5)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Kids Shoes (3)</a></li>
                            </ul>
                        </li>
                        <li className="subMenu"><a>FOOD AND BEVERAGES [1000]</a>
                            <ul style={{ display:"none" }}>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Angoves  (35)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Bouchard Aine & Fils (8)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>French Rabbit (5)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Louis Bernard  (45)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>BIB Wine (Bag in Box) (8)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Other Liquors & Wine (5)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Garden (3)</a></li>
                                <li><a href="products.html"><i className="icon-chevron-right"></i>Khao Shong (11)</a></li>
                            </ul>
                        </li>
                        <li><a href="products.html">HEALTH & BEAUTY [18]</a></li>
                        <li><a href="products.html">SPORTS & LEISURE [58]</a></li>
                        <li><a href="products.html">BOOKS & ENTERTAINMENTS [14]</a></li>
                    </ul>
                    <br />
                    <div className="thumbnail">
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
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.appReducer.account,
    cartTotal: state.appReducer.cartTotal,
    cartQuantity: state.appReducer.cartQuantity,
  });

const mapDispatchToProps = ({
    
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
