import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import { getProByCategory } from './actions';
import { addToCart } from './../Cart/actions';
// import SliderTemp from '../../components/SliderTemp';
import { Link } from 'react-router-dom';
import defaultImage from '../../img/laptop-default.jpg';
import Result from '../Result/index';

class Category extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentWillMount() {
        console.log("component will mount");
        const category_id = this.props.match.params.id;
        this.props.getProByCategory(category_id);
    }

    componentWillReceiveProps(nextProps) {
        console.log("CATEGORY RECIEVE PROPS: ", nextProps);
        const category_id = nextProps.match.params.id;
        this.props.getProByCategory(category_id);

    } 

    updateProps = () => {
        this.props.dispath()
    }
    
    render() {
        //Ket qua search
        console.log("CATEGORY REREDERED");
        return (
            <Result attr="resProByCategory" />
        )
    }
}

const mapStateToProps = (state) => ({
    // resProByCategory: state.appReducer.resProByCategory,
});

const mapDispatchToProps = ({
    getProByCategory,
    addToCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
