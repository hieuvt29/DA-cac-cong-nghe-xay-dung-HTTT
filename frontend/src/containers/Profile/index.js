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
        this.setState({ [e.target.name]: e.target.value });
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
                    return (
                        <div className="form-group" key={index}>
                            <label htmlFor={attr}>{attr.toUpperCase()}</label>
                            <input className="form-control" id={attr} name={attr} value={this.props.account[attr]?this.props.account[attr]:""} onChange={this.change}/>
                        </div>
                    );
                })
                }
                {/* <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"/>
                    </div>
                    </div>
                    <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                    <div className="col-sm-10">          
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd"/>
                    </div>
                    </div>
                    <div className="form-group">        
                    <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                        <label><input type="checkbox" name="remember"/> Remember me</label>
                        </div>
                    </div>
                    </div>
                 */}
                 <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Submit</button>
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
