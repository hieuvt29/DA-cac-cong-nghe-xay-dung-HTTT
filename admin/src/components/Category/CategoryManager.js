import React from 'react';
import DataTable from '../Table/index';
import $ from 'jquery';
import { address } from '../config';
import { Link } from "react-router-dom";

class CategoryManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true,
        }
    }
    componentDidMount(){
        console.info("CategoryManager DidMount");
        $.ajax({
            url: '/categories',
            method: 'GET'
        }).then(res => {
            this.setState({data: res.categories});
        })
    }

    remove = (id) => {
        // let that = this;
        try {
            fetch(`${address}/categories/`+id, {
                method: 'DELETE'
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('DELETE category:', data);
                // that.forceUpdate();
              });
        } catch (error) {
            console.log('REMOVE category error', error);
        }
    }

    submit = (data) => {
        console.log('---Ham cua thang bo: ---', data);
        let dataObject;
        let id = '';
        // let that = this;
        data.forEach(item => {
            if (item.title === "categoryId") {
                id = item.text;
            } else {
                dataObject = { ...dataObject, [item.title]: item.text }
            }
        });
        
        console.log('---SUBMIT UPDATE---', dataObject.categoryName);
        const url = `${address}/categories/`+id;
        console.log('URL =', url);
        try {
            fetch(url, {
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
                Category Manager
                </h1>
                <ol className="breadcrumb">
                    <li><Link to='/admin'><i className="fa fa-dashboard"></i> Home</Link></li>
                    <li className="active">Category Manager</li>
                </ol>
                </section>
                <DataTable remove={this.remove} categories={this.state.data} submit={this.submit} data={this.state.data} tableName="Categories"/>
            </div>
        );
    }
}

export default CategoryManager;