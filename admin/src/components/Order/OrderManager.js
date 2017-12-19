import React from 'react';
import DataTable from '../Table/index';
import $ from 'jquery';
import { address } from '../config';


class OrderManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true,
            showModal: false,
            updateNumber: 0,
        }
    }
    componentDidMount(){
        console.info("OrderManager DidMount");
        this.callData();
    }

    callData = () => {
        $.ajax({
            url: '/orders',
            method: 'GET'
        }).then(res => {
            this.setState({data: res.orders, updateNumber: (this.setState.updateNumber+1)});
            console.log('---Res orders---', this.state.data);
        });
    }

    remove = (id) => {
        let that = this;
        try {
            fetch(`${address}/orders/`+id, {
                method: 'DELETE'
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('DELETE supplier:', data);
                // that.forceUpdate();
              });
        } catch (error) {
            console.log('REMOVE supplier error', error);
        }
    }

    submit = (data) => {
        console.log('---Ham cua thang bo: ---', data);
        let dataObject = [];
        let id = '';
        let that = this;     
        data.forEach(item => {
            if (item.title === "orderId") {
                id = item.text;
            } else if (item.title === "Products" || item.title === "total") {

            } else {
                dataObject = { ...dataObject, [item.title]: item.text }
            }
        });
        try {
            fetch(`${address}/orders/`+id, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify(dataObject),
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('Update order:', data);
                alert(data.message);
                if(data.message === "updated"){
                    window.location.reload();
                }
              });
            console.log('---Data Object---', dataObject);
        } catch (error) {
            console.log('---This is an error---', error);
        }
        
    }

    render () {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                <h1>
                    Order Manager
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li className="active">Order Manager</li>
                </ol>
                </section>
                <DataTable remove={this.remove} resMessage={this.state.resMessage} updateNumber={this.state.updateNumber} submit={this.submit} data={this.state.data} tableName="Orders"/>
            </div>
        );
    }
}

export default OrderManager;