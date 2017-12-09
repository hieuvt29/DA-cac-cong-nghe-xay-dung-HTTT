import React from 'react';
import DataTable from '../Table/index';
import $ from 'jquery';

class ProductManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true
        }
    }
    componentDidMount(){
        console.info("ProductManager DidMount");
        $.ajax({
            url: '/products',
            method: 'GET'
        }).then(res => {
            this.setState({data: res.products});
        })
    }

    remove = (id) => {
        let that = this;
        try {
            fetch('http://localhost:3001/products/'+id, {
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
            fetch('http://localhost:3001/products/'+id, {
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
        return (
            <div className="content-wrapper">
                <section className="content-header">
                <h1>
                    Product Manager
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li className="active">Product Manager</li>
                </ol>
                </section>
                <DataTable remove={this.remove} submit={this.submit} data={this.state.data} tableName="Products"/>
            </div>
        );
    }
}

export default ProductManager;