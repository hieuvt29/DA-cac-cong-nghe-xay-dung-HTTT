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
                <DataTable data={this.state.data} tableName="Products"/>
            </div>
        );
    }
}

export default ProductManager;