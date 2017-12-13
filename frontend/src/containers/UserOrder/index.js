import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, removeOrder } from './actions';
import { getCookie, setCookie } from '../../globalFunc';
import {updateCart} from '../Cart/actions';
import { access } from 'fs';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="span9">
                <ul className="breadcrumb">
                    <li><Link to="/home">Trang chủ</Link> <span className="divider">/</span></li>
                    <li className="active">DANH SÁCH ĐƠN HÀNG</li>
                </ul>
                <h3>   DANH SÁCH ĐƠN HÀNG </h3>
                {this.props.userOrders?(
                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> STT </th>
                                    <th>Mã Đơn Hàng</th>
                                    <th>Danh sách sản phẩm (số lượng)</th>
                                    <th>Tổng</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                {this.state.cart.map((item, index) => (
                                    <tr key={item.productId}>
                                        <td>{index}</td>
                                        <td>{item.productName} </td>
                                        <td> <img width="60" src={item.image} alt="" /></td>
                                        <td> {item.quantity}</td>
                                        <td>{Number((item.price * item.quantity).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td> </td>
                                    <td></td>
                                    <td></td>
                                    <td>Tổng</td>
                                    <td>{this.state.cartTotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                </tr>
                            </tbody> */}
                        </table>
                        <hr className="soft" />
                    </div>
                ):(
                    <div className="well"><div className="alert alert-info">Chưa có đơn hàng nào!</div></div>
                )}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.appReducer.account,
    resCreateOrder: state.appReducer.resCreateOrder,
    order_failed: state.appReducer.order_failed
});

const mapDispatchToProps = ({
    createOrder,
    removeOrder,
    updateCart
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);