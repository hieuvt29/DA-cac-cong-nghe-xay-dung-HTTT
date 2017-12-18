import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {updateInfo} from './actions';
import { address } from '../../config';

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: "",
            openAlert: false,
            openChangePassword: false,
            resChangePassword: false,
            errorChangePassword: false
        };
    }
    static contextTypes = {
        router: PropTypes.object
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    update() {
        let newInfo = {};
        this.state.attrs.forEach(attr => {
            newInfo[attr] = this.state[attr];
        });
        this.props.updateInfo(newInfo)
    }
    updatePassword () {
        console.log("Update password");
        let oldPassword = this.state.oldPassword;
        let newPassword = this.state.newPassword;
        if (!oldPassword || !newPassword) {
            this.setState({error: "Hãy nhập vào thông tin!"});
            return ;
        }
        if (oldPassword.length < 4 || newPassword.length < 4) {
            this.setState({error: "Mật khẩu không nhỏ hơn 4 ký tự!"});
            return;
        }
        console.log("oldd, new: ", oldPassword, newPassword);
        fetch(address + '/user/change-password', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
              oldPassword: oldPassword,
              newPassword: newPassword
            }),
          }).then(res => {
            console.log("res: ", res);
            return res.json();
          }).then(json => {
            console.log("res json: ", json);
            if (json.message === "not login") {
                this.setState({
                    error: "Kiểm tra lại tình trạng đăng nhập!"
                })
            } else if (json.message === "Password mismatch") {
                this.setState({
                    error: 'Mật khẩu hiện tại không đúng!'
                });
            } else if (json.message === "password changed") {
                this.setState({
                    error: "",
                    resChangePassword: true,
                    errorChangePassword: false
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                this.setState({
                    error: "Lỗi không xác định",
                    resChangePassword: false,
                    errorChangePassword: false
                });
            }
          });
        
    }
    componentWillMount() {
        let account = localStorage.getItem('account');
        if (account) {
            account = JSON.parse(account);      
            this.setState({...this.state, ...account, attrs: Object.keys(account)});
        }
        // this.setState({...this.state, nextProps});
    }
    reload() {
        window.location.reload();
    }
    change = (e) => {
        let newState = {...this.state, [e.target.name]: e.target.value};
        this.setState(newState);
    }
    render() {
        return ( 
            <div className="span9">
            <ul className="breadcrumb">
                <li><Link to="/home">Trang chủ</Link> <span className="divider">/</span></li>
                <li className="active">Thông tin tài khoản</li>
            </ul>
            <h3>THÔNG TIN TÀI KHOẢN</h3>
            <form className="form-horizontal">
                {
                this.state.attrs.map((attr, index) => {
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
                                    <div>
                                        <input type="password" id={attr} name={attr} value="********" onChange={this.change} disabled="disabled"/> 
                                        <a onClick={e => this.setState({openChangePassword: true})}> Thay đổi mật khẩu</a>
                                    </div>
                                ):attr == "userName"?(
                                    <input type="text" id={attr} name={attr} value={this.state[attr]?this.state[attr]:""} onChange={this.change} disabled="disabled"/>
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
                                    <input type="text" id={attr} name={attr} value={this.state[attr]?this.state[attr]:""} onChange={this.change}/>
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
                {this.state.openAlert && <div
                    id="manhinhtoi"
                    onClick={() => {
                        this.setState({ openAlert: false });
                    }}
          className="modal-backdrop fade in"></div> }
            </form>
            {this.state.openAlert && 
            <div id="login" className={"modal fade in"} tabIndex="-1" role="dialog" aria-labelledby="login" aria-hidden="false" >
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

            {this.state.openChangePassword?(
            <div id="changePassword" className={"modal fade in"} tabIndex="-1" role="dialog" aria-labelledby="changePassword" aria-hidden="false" >
                <div className="modal-header">
                    <button type="button" className="close closeLogin" onClick={() => this.setState({ openChangePassword: false })} data-dismiss="modal" aria-hidden="true">×</button>
                    <h3>Thay đổi mật khẩu</h3>
                </div>
                <div className="modal-body">
                    <div><span style={{color: 'red', fontSize: '1.5em'}}>{this.state.error? this.state.error: (this.state.resChangePassword?"Cập nhật thông tin thành công!":(this.state.errorChangePassword?"Không thể thay đổi mật khẩu, kiểm tra lại thông tin!":""))}</span></div>
                    <div className="control-group">
                            <label className="control-label" htmlFor="oldPassword"><b>Mật khẩu hiện tại</b></label>
                            <div className="controls">
                            <input type="password" id="oldPassword" name="oldPassword" value={this.state.oldPassword} onChange={this.change}/>
                            </div>
                    </div>
                    <div className="control-group">
                            <label className="control-label" htmlFor="newPassword"><b>Mật khẩu mới</b></label>
                            <div className="controls">
                            <input type="password" id="newPassword" name="newPassword" value={this.state.newPassword} onChange={this.change}/>
                            </div>
                    </div>

                    <br/>
                    <a className="btn btn-info" onClick={e => this.updatePassword()}>Cập nhật</a>
                </div>
            </div>):""}
            {(this.state.openAlert || this.state.openChangePassword) && <div
            id="manhinhtoi"
            onClick={() => {
                this.setState({ openAlert: false, openChangePassword: false });
            }}
            className="modal-backdrop fade in"></div> }
        </div>
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
