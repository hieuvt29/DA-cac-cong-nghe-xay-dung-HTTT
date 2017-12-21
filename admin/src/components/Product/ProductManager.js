import React from 'react';
import DataTable from '../Table/index';
import $ from 'jquery';
import { address } from '../config';
import AlertContainer from 'react-alert';


class ProductManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true,
            categories: [],
            suppliers: [],
        }
    }
    componentDidMount(){
        // console.info("ProductManager DidMount");
        $.ajax({
            url: '/products',
            method: 'GET'
        }).then(res => {
            this.setState({data: res.products});
            console.log('---Res product---', this.state.data);
            $.ajax({
                url: '/categories',
                method: 'GET'
            }).then(res => {
                this.setState({categories: res.categories});
                // console.log('---DAD categories---', this.state.categories);
                $.ajax({
                    url: '/suppliers',
                    method: 'GET'
                }).then(res => {
                    this.setState({suppliers: res.suppliers});
                    console.log('---Res supp---', this.state.suppliers);
                });
            });
        });
        
        

    }

    remove = (id) => {
        // let that = this;
        try {
            fetch(`${address}/products/`+id, {
                method: 'DELETE'
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('DELETE product:', data);
                // that.forceUpdate();
              });
        } catch (error) {
            console.log('REMOVE product error', error);
        }
    }

    submit = (data) => {
        let that = this;        
        console.log('---Ham cua thang bo: ---', data);
        let dataObject;
        let id = '';
        data.forEach(item => {
            if (item.title === "productId") {
                id = item.text;
            } else {
                dataObject = { ...dataObject, [item.title]: item.text }
            }
        });
        try {
            fetch(`${address}/products/`+id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                credentials: 'same-origin',
                body: JSON.stringify(dataObject)
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('Created Gist:', data);
                that.msg.show("Cập nhật thành công!", {
                    time: 2000,
                    type: 'info'
                });
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
                    Product Manager
                </h1>
                <AlertContainer ref={a => this.msg = a} {...{offset: 14, position: 'top right', theme: 'dark', time: 5000, transition: 'scale'}} />
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li className="active">Product Manager</li>
                </ol>
                </section>
                <DataTable remove={this.remove} submit={this.submit} suppliers={this.state.suppliers} categories={this.state.categories} data={this.state.data} tableName="Products"/>
            </div>
        );
    }
}

export default ProductManager;