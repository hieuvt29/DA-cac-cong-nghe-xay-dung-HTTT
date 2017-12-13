import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {updateInfo} from './actions';

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: "",
            openAlert: false
        };
    }
    static contextTypes = {
        router: PropTypes.object
    }
    update() {
        let newInfo = {...this.props.account};
        let attrs = Object.keys(this.props.account);
        attrs.forEach(attr => {
            this.state[attr]?newInfo[attr] = this.state[attr]:null ;
        });
        this.props.updateInfo(newInfo)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.account) {
            this.setState({...this.state, ...nextProps.account});
        }
        this.setState({...this.state, nextProps});
    }
    reload() {
        window.location.reload();
    }
    change = (e) => {
        let newState = {...this.state, [e.target.name]: e.target.value };
        this.setState(newState);
    }
    render() {
        return ( 
        this.props.account?
        (<div className="span9">
            <ul className="breadcrumb">
                <li><Link to="/home">Trang chủ</Link> <span className="divider">/</span></li>
                <li className="active">Thông tin tài khoản</li>
            </ul>
            <h3>THÔNG TIN TÀI KHOẢN</h3>
            <form className="form-horizontal">
                {
                Object.keys(this.props.account).map((attr, index) => {
                    console.log("attr: ", attr);
                    let attrs = "";
                    switch (attr) {
                        case "userName":
                            attrs = "Tên tài khoản";
                            break;
                        case "password":
                            attrs = "Mật khẩu";
                            break;
                        case "firstName":
                            attrs = "Tên";
                            break;
                        case "lastName":
                            attrs = "Họ";
                            break;
                        case "gender":
                            attrs = "Giới tính";
                            break;
                        case "email":
                            attrs = "Email";
                            break;
                        case "dob":
                            attrs = "Ngày sinh";
                            break;
                        case "telephone":
                            attrs = "Số điện thoại";
                            break;
                        case "address":
                            attrs = "Địa chỉ";
                            break;
                    }
                    if (["accountId", "role", "createdAt", "updatedAt"].indexOf(attr) != -1){
                        return;
                    }
                    
                    return (
                        <div className="control-group" key={index}>
                            <label className="control-label" htmlFor={attr}><b>{attrs}</b></label>
                            <div className="controls">
                                {(attr == "password")?(
                                    <input id={attr} name={attr} value="********" onChange={this.change} disabled="disabled"/>
                                ):attr == "userName"?(
                                    <input id={attr} name={attr} value={this.state[attr]?this.state[attr]:""} onChange={this.change} disabled="disabled"/>
                                ):attr=="gender"?(
                                    <div>
                                    <label className="radio">
                                        <input type="radio" name="gender" id="male" value="male" checked={this.state[attr] == "male"} onChange={this.change}/>
                                        Nam
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="gender" id="female" value="female" checked={this.state[attr] == "female"} onChange={this.change}/>
                                        Nữ
                                    </label>
                                    </div>
                                ):(
                                    <input id={attr} name={attr} value={this.state[attr]?this.state[attr]:""} onChange={this.change}/>
                                )
                                }
                            </div>
                        </div>
                    );
                })
                }
                <div data-toggle="modal"
                onClick={() =>{ this.update(); setTimeout(() => this.setState({ openAlert: true }), 500)}}>
                <span className="btn btn-info">Cập nhật</span>
                </div>
            </form>
            {this.state.openAlert && <div id="login" className={"modal fade in"} tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" >
            <div className="modal-header">
            <button type="button" className="close closeLogin" onClick={() => this.setState({ openAlert: false })} data-dismiss="modal" aria-hidden="true">×</button>
            <h3>Thông báo</h3>
            </div>
            <div className="modal-body">
            <div><span style={{color: 'red', fontSize: '1.5em'}}>{this.state.error? this.state.error: (this.props.updatedAccount?"Cập nhật thông tin thành công!":(this.props.updateInfoFailed?"Không thể cập nhật, kiểm tra lại thông tin!":""))}</span></div>

            <br/>
            <Link to="/customer/profile" style={{margin: "0 auto"}}>
                <button className="btn input-group-btn" onClick={() => {this.reload();this.setState({ ...this.state, error: "", openAlert: false })}} data-dismiss="modal">OK</button>
            </Link>
            </div>
            </div>}
        </div>
        ):(<div>{this.context.router.history.push("/")}</div>)
    )}
}

const mapStateToProps = (state) => ({
    account: state.appReducer.account,
    updatedAccount: state.appReducer.updatedAccount,
    updateInfoFailed: state.appReducer.updateInfoFailed
});

const mapDispatchToProps = ({
    updateInfo
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
