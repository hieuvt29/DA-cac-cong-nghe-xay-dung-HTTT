import React from 'react';
import DataTable from '../Table/index';
import $ from 'jquery';

class CategoryManager extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            loading: true
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
        try {
            fetch('http://localhost:3001/categories/'+id, {
                method: 'DELETE'
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('DELETE category:', data);
                this.forceUpdate();
              });
        } catch (error) {
            console.log('REMOVE category error', error);
        }
    }

    submit = (data) => {
        console.log('---Ham cua thang bo: ---', data);
        let dataObject;
        let id = '';
        data.forEach(item => {
            if (item.title === "categoryId") {
                id = item.text;
            } else {
                dataObject = { ...dataObject, [item.title]: item.text }
            }
        });
        try {
            fetch('http://localhost:3001/categories/'+id, {
                method: 'put',
                body: JSON.stringify(dataObject)
              }).then(function(response) {
                return response.json();
              }).then(function(data) {
                console.log('Created Gist:', data);
                this.forceUpdate();
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
                    <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                    <li className="active">Category Manager</li>
                </ol>
                </section>
                <DataTable remove={this.remove} submit={this.submit} data={this.state.data} tableName="Categories"/>
            </div>
        );
    }
}

export default CategoryManager;