import React from 'react';
import DataTable from '../Table/index';
import $ from 'jquery';
import { address } from '../config';
import { Link } from "react-router-dom";

class AccountManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            username: '',
            password: '',
            repassword: '',
            firstName: '',
            lastName: '',
            gender: 'khac',
            dob: '',
            email: '',
            telephone: '',
            address: '',
            error: '',
            showError: '',
            dataAdmins: '',
        }
    }
    shouldComponentUpdate(nextState) {
        return this.state.data !== nextState.data;
    }
    componentDidMount(){
        console.info("AccountManager DidMount");
        $.get('/customers', res => {
            console.log("get customers: ", res);
            this.setState({data: res.accounts});
        });
        $.get('/admins', res => {
            console.log("get customers: ", res);
            this.setState({dataAdmins: res.accounts});
            console.log('---Admins---', this.dataAdmins);
        });
    }

    remove = (id) => {
        try {
            console.log("Try to delete", id);
        } catch (error) {
            console.log('---Error remove account---', error);
        }
    }

    submit = (data) => {
        console.log('---Ham cua thang bo: ---', data);
        let dataObject;
        let id = '';
        // let that = this;
        data.forEach(item => {
            if (item.title === "accountId") {
                id = item.text;
            } else {
                dataObject = { ...dataObject, [item.title]: item.text }
            }
        });
        try {
            fetch(`${address}/customers/`+id, {
                method: 'put',
                body: JSON.stringify(dataObject)
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('Created Gist:', data);
                // that.forceUpdate();
              });
            console.log('---Data Object---', dataObject);
        } catch (error) {
            console.log('---This is an error---', error);
        }
        
    }
    render () {
        console.log("AM rendered");
        return (
            <div className="content-wrapper">
                <section className="content-header">
                <h1>
                    Account Manager
                </h1>
                <ol className="breadcrumb">
                    <li><Link to='/admin'><i className="fa fa-dashboard"></i> Home</Link></li>
                    <li className="active">Account Manager</li>
                </ol>
                </section>
                <DataTable submit={this.submit} remove={this.remove} data={this.state.data} tableName="Customers"/>
            </div>
        )
    }
}

export default AccountManager;