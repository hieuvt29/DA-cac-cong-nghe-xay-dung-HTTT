import React from 'react';
import { connect } from 'react-redux';
import { signup } from './actions';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            error: '',
            showError: '',
        }
    }

    closeError = () => {
        this.setState({ showError: 'hide' });
    }

    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submit = () => {
        this.setState({ showError: '' });
        let re = /^\w+$/;
        if(this.state.username === '') {
            this.setState({ error: 'Username cannot blank', password: '' });
        } 
        else if (!re.test(this.state.username)) {
            this.setState({ error: 'Username must contain only letters, numbers and underscores!' });
        }

        else if(this.state.password === '') {
            this.setState({ error: 'Password cannot blank' });
        }
        else if (this.state.password !== this.state.repassword) {
            this.setState({ error: 'Please check that you\'ve entered and confirmed your password!' });
        }
        else if(this.state.password === this.state.repassword) {
            if(this.state.password.length < 6) {
              this.setState({ error: 'Password must contain at least six characters!', password: '' });
            }
            if(this.state.password === this.state.username) {
              this.setState({ error: 'Password must be different from Username!' });
            }
            re = /[0-9]/;
            if(!re.test(this.state.password)) {
              this.setState({ error: 'password must contain at least one number (0-9)!' });
            }
            re = /[a-z]/;
            if(!re.test(this.state.password)) {
              this.setState({ error: 'password must contain at least one lowercase letter (a-z)!' });
            } else {
                this.setState({ showError: 'hide' });
                this.props.signup(this.state.username, this.state.password);
            }
        } 
    };

    render() {
        return (
            <div className="span9">
                <ul className="breadcrumb">
                    <li><a href="index.html">Home</a> <span className="divider">/</span></li>
                    <li className="active">Registration</li>
                </ul>
                <h3> Registration</h3>
                <div className="well">

                    <form className="form-horizontal" >
                        <h4>Your personal information</h4>
                        <div className="control-group">
                            <label className="control-label" htmlFor="input_username">Username <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="input_username" autoComplete="false" name="username" onChange={this.change} value={this.state.username} placeholder="Username" />
                            </div>
                        </div>
                        <div className="control-group">
                            <label className="control-label" htmlFor="inputPassword1">Password <sup>*</sup></label>
                            <div className="controls">
                                <input type="password" id="inputPassword1" name="password" onChange={this.change} value={this.state.password} placeholder="Password" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="inputPassword2">Retype Password <sup>*</sup></label>
                            <div className="controls">
                                <input type="password" id="inputPassword2" name="repassword" onChange={this.change} value={this.state.repassword} placeholder="Retype Password" />
                            </div>
                        </div>

                        <div className={ "alert alert-block alert-error fade in"+this.state.showError }>
                            <button type="button" className="close" onClick={this.closeError} data-dismiss="alert">×</button>
                            <strong>{this.state.error}</strong>
                        </div>

                        <p><sup>*</sup>Required field	</p>
                    </form>
                    <div className="control-group">
                        <div className="controls">
                            <button className="btn btn-large btn-success" onClick={this.submit}>Register</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = ({
    signup,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);