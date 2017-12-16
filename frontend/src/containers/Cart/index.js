import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCart } from './actions';
import { signin } from '../Header/actions';
// import { getCookie, setCookie } from '../../globalFunc';
import defaultImage from '../../img/laptop-default.jpg'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartTotal: 0,
      cartQuantity: 0,
      username: '',
      password: '',
    };
  }
  signin() {
    this.props.signin(this.state.username, this.state.password);

  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillMount() {
    // $("#loginBtn").click(() => {
    //   $("#login").toggle();
    // });
    // $(".closeLogin").click(() => {
    //   $("#login").fadeOut(0);
    // });
    // console.log('-Cart String-  =', getCookie('cart'));
    let cartArr = [];
    const cartString = localStorage.getItem('cart');
    cartArr = (cartString === '') ? [] : JSON.parse(cartString);
    // console.log('CART Array =', cartArr);
    let cartTotal = parseFloat(localStorage.getItem('cartTotal'))?parseFloat(localStorage.getItem('cartTotal')):0;
    let cartQuantity = parseInt(localStorage.getItem('cartQuantity'), 10)?parseInt(localStorage.getItem('cartQuantity'), 10):0;
    this.setState({ cart: cartArr });
    this.setState({ cartTotal: cartTotal });
    this.setState({ cartQuantity: cartQuantity });
    // console.log('---TuyenTN---', (this.state.cart));
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  incQuantity = (item) => {
    let cartArr = this.state.cart;
    let index = this.lookCart(item, cartArr);
    cartArr[index].quantity += 1;
    let cartTotal = this.state.cartTotal + item.price;
    let cartQuantity = this.state.cartQuantity + 1;
    this.setState({ cart: cartArr });
    this.setState({ cartTotal: cartTotal });
    this.setState({ cartQuantity: cartQuantity });
    localStorage.setItem('cart', JSON.stringify(cartArr));
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    this.props.updateCart(cartTotal, cartQuantity);
  }
  decQuantity = (item) => {
    if (item.quantity === 0) return;
    let cartArr = this.state.cart;
    let index = this.lookCart(item, cartArr);
    cartArr[index].quantity -= 1;
    let cartTotal = this.state.cartTotal - item.price;
    let cartQuantity = this.state.cartQuantity - 1;
    this.setState({ cart: cartArr });
    this.setState({ cartTotal: cartTotal });
    this.setState({ cartQuantity: cartQuantity });
    localStorage.setItem('cart', JSON.stringify(cartArr));
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    this.props.updateCart(cartTotal, cartQuantity);    
  }
  remove = (item) => {
    let cartArr = this.state.cart;
    let index = this.lookCart(item, cartArr);
    cartArr.splice(index, 1);
    let cartTotal = this.state.cartTotal - item.price*item.quantity;
    let cartQuantity = this.state.cartQuantity - item.quantity;
    this.setState({ cart: cartArr });
    this.setState({ cartTotal: cartTotal });
    this.setState({ cartQuantity: cartQuantity });    
    localStorage.setItem('cart', JSON.stringify(cartArr));
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    this.props.updateCart(cartTotal, cartQuantity);    
  }
  lookCart = (item, cartArr) => {
    let i;
    for (i = 0; i < cartArr.length; i++) {
      if (cartArr[i].productId === item.productId) {
        break;
      }
    }
    return i;
  }
  signin = () => {
    this.props.signin(this.state.username, this.state.password);
  }
  render() {
    if (!this.state.cart || (this.state.cart && !this.state.cart.length)){
      return (<div className="span9"><h4>Giỏ hàng chưa được tạo, vui lòng quay lại mua hàng!</h4></div>)
    } else {
      return (
        <div className="span9">
        <ul className="breadcrumb">
            <li><a href="index.html">Trang chủ</a> <span className="divider">/</span></li>
            <li className="active"> GIỎ HÀNG</li>
        </ul>
        <h3>  GIỎ HÀNG  [ <small>{ this.state.cartQuantity } sản phẩm </small>]
        <Link className="btn btn-large pull-right" to="/home"><i className="icon-arrow-left"></i> Tiếp tục mua </Link></h3>	
        <hr className="soft"/>
        {(!this.props.account.userName)? (
        <table className="table table-bordered">
          <tbody>
            <tr><th> Đăng nhập  </th></tr>
             <tr> 
             <td>
                <form className="form-horizontal">
                    <div className="control-group">
                      <label className="control-label" htmlFor="inputUsername">Tên đăng nhập</label>
                      <div className="controls">
                        <input type="text" id="inputUsername" value={this.state.username} name="username" onChange={this.change} placeholder="Username" />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label" htmlFor="inputPassword1">Mật khẩu</label>
                      <div className="controls">
                        <input type="password" id="inputPassword1" value={this.state.password} name="password" onChange={this.change} placeholder="Password" />
                      </div>
                    </div>
                    <div className="control-group">
                      <div className="controls">
                        <button type="button" onClick={this.signin} className="btn"> Đăng nhập </button>
                         OR <Link to="/signup" className="btn">Đăng kí!</Link>
                      </div>
                    </div>
                    <div className="control-group">
                        <div className="controls">
                          <a href="forgetpass.html" style={{ textDecoration: "underline" }}>Quên mật khẩu ?</a>
                        </div>
                    </div>
                </form>
              </td>
              </tr>
            </tbody>
        </table>		
        ): null}  

        <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th> Mô tả </th>
                      <th>Cập nhật</th>
                      <th> Giá</th>
                      <th> Giảm giá</th>
                      <th> Thuế</th>
                      <th> Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.cart.map((item, index) =>  (
                    <tr key={item.productId}>
                      <td> <Link to={`/product/${item.productId}`}><img width="60" src={(item.image === "/img/default.png")? defaultImage : item.image} alt="" /></Link></td>
                      <td><Link to={`/product/${item.productId}`}>{item.productName}</Link></td>
                      <td>
                        <div className="input-append">
                            <input className="span1" style={{ maxWidth: "34px" }} placeholder={item.quantity} id="appendedInputButtons" size="16" type="text" />
                            <button className="btn" type="button" onClick={ () => this.decQuantity(item)}><i className="icon-minus"></i></button>
                            <button className="btn" type="button" onClick={ () => this.incQuantity(item)}><i className="icon-plus"></i></button>
                            <button className="btn btn-danger" type="button" onClick={ () => this.remove(item)}><i className="icon-remove icon-white"></i></button>
                        </div>
                      </td>
                      <td>{ Number((item.price*item.quantity).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</td>
                      <td>0</td>
                      <td>{ 0 }</td>
                      <td>{ Number((item.price*item.quantity).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</td>
                    </tr>
                    )
                  )}
                  <tr>
                      <td> </td>
                      <td></td>
                      <td>
                      </td>
                      <td></td>
                      <td></td>
                      <td>Tổng</td>
                      <td>{ this.state.cartTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</td>
                    </tr>
                    </tbody>
                </table>
            
            
                {/* <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <form className="form-horizontal">
                                    <div className="control-group">
                                        <label className="control-label"><strong> MÃ GIẢM GIÁ: </strong> </label>
                                        <div className="controls">
                                            <input type="text" className="input-medium" placeholder="CODE" />
                                            <button type="submit" className="btn"> OK </button>
                                        </div>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table> */}
                
        <Link className="btn btn-large" to="/home"><i className="icon-arrow-left"></i> Tiếp tục mua </Link>
        <Link to="/order" className="btn btn-large pull-right">Checkout<i className="icon-arrow-right"></i></Link>
        
      </div>
    );
    }
    
  }
}

const mapStateToProps = (state) => ({
  account: state.appReducer.account,  
});

const mapDispatchToProps = ({
  updateCart, signin
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);