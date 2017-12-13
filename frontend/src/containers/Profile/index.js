import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }
    change = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.value });
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
                Object.keys(this.props.account).map((attr, index) => {
                    if (["accountId", "role", "createdAt", "updatedAt"].indexOf(attr) != -1){
                        return;
                    }
                    if (attr == "password"){
                        return (
                            <div className="control-group" key={index}>
                                <label className="control-label" htmlFor={attr}><b>{attr.toUpperCase()}</b></label>
                                <div className="controls">
                                    <input id={attr} name={attr} value="********" disabled="disabled"/>
                                </div>
                            </div>
                        )
                    } else if (attr == "userName"){
                        return (
                            <div className="control-group" key={index}>
                                <label className="control-label" htmlFor={attr}><b>{attr.toUpperCase()}</b></label>
                                <div className="controls">
                                    <input id={attr} name={attr} value={this.props.account[attr]?this.props.account[attr]:""} disabled="disabled"/>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="control-group" key={index}>
                                <label className="control-label" htmlFor={attr}><b>{attr.toUpperCase()}</b></label>
                                <div className="controls">
                                    <input id={attr} name={attr} value={this.props.account[attr]?this.props.account[attr]:""} onChange={this.change}/>
                                </div>
                            </div>
                        );
                    }
                })
                }
                 <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
    }
}

const mapStateToProps = (state) => ({
    account: state.appReducer.account
});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
