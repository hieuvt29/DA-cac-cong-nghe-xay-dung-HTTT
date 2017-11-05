import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { getCookie, setCookie } from '../../globalFunc';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
    };
  }

  componentDidMount() {
    // $("#loginBtn").click(() => {
    //   $("#login").toggle();
    // });
    // $(".closeLogin").click(() => {
    //   $("#login").fadeOut(0);
    // });
    this.setState({ cart: getCookie('cart') });
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
        <div className="span9">
        <ul className="breadcrumb">
            <li><a href="index.html">Home</a> <span className="divider">/</span></li>
            <li className="active"> SHOPPING CART</li>
        </ul>
        <h3>  SHOPPING CART [ <small>3 Item(s) </small>]
        <Link className="btn btn-large pull-right" to="/home"><i className="icon-arrow-left"></i> Continue Shopping </Link></h3>	
        <hr className="soft"/>
        <table className="table table-bordered">
            <tr><th> I AM ALREADY REGISTERED  </th></tr>
             <tr> 
             <td>
                <form className="form-horizontal">
                    <div className="control-group">
                      <label className="control-label" for="inputUsername">Username</label>
                      <div className="controls">
                        <input type="text" id="inputUsername" placeholder="Username" />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label" for="inputPassword1">Password</label>
                      <div className="controls">
                        <input type="password" id="inputPassword1" placeholder="Password" />
                      </div>
                    </div>
                    <div className="control-group">
                      <div className="controls">
                        <button type="submit" className="btn">Sign in</button> OR <a href="register.html" className="btn">Register Now!</a>
                      </div>
                    </div>
                    <div className="control-group">
                        <div className="controls">
                          <a href="forgetpass.html" style={{ textDecoration: "underline" }}>Forgot password ?</a>
                        </div>
                    </div>
                </form>
              </td>
              </tr>
        </table>		
                
        <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity/Update</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Tax</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> <img width="60" src="themes/images/products/4.jpg" alt=""/></td>
                      <td>MASSA AST<br/>Color : black, Material : metal</td>
                      <td>
                        <div className="input-append">
                            <input className="span1" style={{ maxWidth: "34px" }} placeholder="1" id="appendedInputButtons" size="16" type="text" />
                            <button className="btn" type="button"><i className="icon-minus"></i></button>
                            <button className="btn" type="button"><i className="icon-plus"></i></button>
                            <button className="btn btn-danger" type="button"><i className="icon-remove icon-white"></i></button>
                        </div>
                      </td>
                      <td>$120.00</td>
                      <td>$25.00</td>
                      <td>$15.00</td>
                      <td>$110.00</td>
                    </tr>
                    </tbody>
                </table>
            
            
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <form className="form-horizontal">
                                    <div className="control-group">
                                        <label className="control-label"><strong> VOUCHERS CODE: </strong> </label>
                                        <div className="controls">
                                            <input type="text" className="input-medium" placeholder="CODE" />
                                            <button type="submit" className="btn"> ADD </button>
                                        </div>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
        <Link className="btn btn-large" to="/home"><i className="icon-arrow-left"></i> Continue Shopping </Link>
        <a href="login.html" className="btn btn-large pull-right">Next <i className="icon-arrow-right"></i></a>
        
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);