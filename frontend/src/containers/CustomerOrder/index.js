import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, removeOrder } from './actions';
import { getCookie, setCookie } from '../../globalFunc';
import {updateCart} from '../Cart/actions';
import {getCustomerOrders, changeOrderState} from './actions';
import orderState from '../common/order-states';
import PropTypes from 'prop-types';

class CustomerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            openAlert: false
        };
    }
    static contextTypes = {
        router: PropTypes.object
    }
    sortByTime(a,b) {
        let a1 = new Date(a.createdAt);
        let b1 = new Date(b.createdAt);
        return (Date.parse(a1) - Date.parse(b1)) <= 0;
    }

    reload(){
        window.location.reload();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({...this.props, nextProps});
    } 
    componentDidMount() {
        let account = getCookie('account');
        if (account != ''){
            account = JSON.parse(account);
            this.props.getCustomerOrders(account.accountId);
        }
    }

    cancelOrder(orderId, orderstate) {
        if(orderstate == orderState.CANCELLED){
            return this.setState({...this.state, error: "Không thể hủy đơn hàng đã bị hủy!"})
        }
        if (orderstate == orderState.DELIVERED) {
            return this.setState({...this.state, error: "Không thể hủy đơn hàng đã được giao!"});
        }
        this.props.changeOrderState(orderId);
    }
    render() {
        return (
            <div className="span9">
                <ul className="breadcrumb">
                    <li><Link to="/home">Trang chủ</Link> <span className="divider">/</span></li>
                    <li className="active">DANH SÁCH ĐƠN HÀNG</li>
                </ul>
                <h3>   DANH SÁCH ĐƠN HÀNG </h3>
                {(this.props.customerOrders && this.props.customerOrders.length>0)?(
                    <div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã Đơn Hàng</th>
                                    <th>Danh sách sản phẩm (số lượng)</th>
                                    <th>Tổng</th>
                                    <th>Trạng thái</th>
                                    <th>Thời gian tạo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.customerOrders.sort(this.sortByTime).map((order, index) => {
                                    return (
                                        <tr key={order.orderId}>
                                            <td>{index + 1}</td>
                                            <td>{order.orderId} </td>
                                            <td>{order.Products.map((product, index) => (<Link ke={index} to={"/product/" + product.productId}><span key={index}><b>{(index + 1) + ". "}</b>{product.productName + " (" + product['Orders-Products'].orderQuantity + ((index + 1) === order.Products.length?" sản phẩm)":" sản phẩm)")}<br/></span></Link>))}</td>
                                            <td>{Number((order.total).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}&#8363;</td>
                                            <td><span className={"alert " + (order.state == orderState.CANCELLED?"alert-danger":order.state==orderState.DELIVERED?"alert-success":"")}>{order.state}</span></td>
                                            <td>{new Date(order.createdAt).toLocaleString('vi')}</td>
                                            {/* <td><a data-toggle="modal"
                                            onClick={() =>{ this.cancelOrder(order.orderId, order.state); this.setState({ openAlert: true })}}>
                                            <span className="btn btn-danger">Hủy</span>
                                            </a></td> */}
                                        </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                        <hr className="soft" />
                    </div>
                ):(
                    <div className="well"><div className="alert alert-info">Chưa có đơn hàng nào!</div></div>
                )}
                {/* {this.state.openAlert && <div id="login" className={"modal fade in"} tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" >
                    <div className="modal-header">
                    <button type="button" className="close closeLogin" onClick={() => this.setState({ openAlert: false })} data-dismiss="modal" aria-hidden="true">×</button>
                    <h3>Thông báo</h3>
                    </div>
                    <div className="modal-body">
                    <div><span style={{color: 'red', fontSize: '1.5em'}}>{this.state.error? this.state.error: (this.props.cancelledOrder?"Đã Hủy Đơn Hàng":(this.props.cancelOrderFailed?"Không thể hủy đơn hàng!":"Hủy đơn hàng thành công!"))}</span></div>
                    
                    <br/>
                    <Link to="/customer/orders" style={{margin: "0 auto"}}>
                        <button className="btn input-group-btn" onClick={() => {this.reload();this.setState({ ...this.state, error: "", openAlert: false })}} data-dismiss="modal">OK</button>
                    </Link>
                    </div>
                </div>} */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.appReducer.account,
    customerOrders: state.appReducer.customerOrders,
    cancelledOrder: state.appReducer.cancelledOrder,
    cancelOrderFailed: state.appReducer.cancelOrderFailed
});

const mapDispatchToProps = ({
    getCustomerOrders,
    changeOrderState
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrder);