import React from 'react';
import DataTable from '../Table/index';
import $ from 'jquery';

class AccountManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: []
        }
    }
    shouldComponentUpdate(nextState) {
        return this.state.data !== nextState.data;
    }
    componentDidMount(){
        console.info("AccountManager DidMount");
        $.get('/customers', res => {
            console.log("get customers: ", res);
            this.setState({data: res.customers});
        });
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
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li className="active">Account Manager</li>
                </ol>
                </section>
                <DataTable data={this.state.data} tableName="Customers"/>
            </div>
        )
    }
}

export default AccountManager;