import React from 'react';
// import DataTable from '../Table/index';
// import $ from 'jquery';
import { Button } from 'react-bootstrap';
import { setCookie } from '../../globalFunc';
import { address } from '../config';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            response: '',
            showErr: '',
        }
    }

    componentDidMount(){
        // $.ajax({
        //     url: '/orders',
        //     method: 'GET'
        // }).then(res => {
        //     this.setState({data: res.orders});
        // })
    }

    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submit = () => {
        let that = this;
        try {
            fetch(`${address}/login/`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: this.state.username,
                    password: this.state.password
                })
            })
            .then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('RES login:', data);
                if(data.errorCode){
                    that.setState({ response: "Sai tên đăng nhập hoặc mật khẩu" });
                } else {
                    setCookie('account', JSON.stringify(data.user));
                    that.props.history.push('/');
                }
              });
        } catch (error) {
            console.log('---This is an error---', error);
        }

    }

    render() {
        return (
            <div id="lgi" className="login-page">
                <h2 style={{ textAlign: 'center'}}>Đăng nhập </h2>
                {this.state.response ? (
                    <div>
                        <p>{this.state.response}</p>
                        {/* <span style={{ marginLeft: '20px', fontSize: '20px', cursor: 'pointer' }}><b>Clear</b></span> */}
                    </div>
                ) : null}
                <div className="form">
                    <form className="login-form" onClick={() => this.setState({ response: '' })}>
                        <input type="text" id="username" value={this.state.username} onChange={this.change} name="username" placeholder="username" />
                        <input type="password" id="password" value={this.state.password} onChange={this.change} name="password" placeholder="password" />
                        <Button onClick={this.submit}>login</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;