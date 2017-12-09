import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import { getProBySupplier } from './actions';
import { addToCart } from './../Cart/actions';
// import SliderTemp from '../../components/SliderTemp';
import { Link } from 'react-router-dom';
import defaultImage from '../../img/laptop-default.jpg';
import Result from '../Result';

class Supplier extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount () {
        console.log("SUPPLIER did mount");
    }
    componentWillMount() {
        console.log("SUPPLIER  will mount");
        const supplier_id = this.props.match.params.id;
        this.props.getProBySupplier(supplier_id);
    }

    componentWillReceiveProps(nextProps) {
        console.log("SUPPLIER RECIEVE PROPS: ", nextProps);
        const supplier_id = nextProps.match.params.id;
        this.props.getProBySupplier(supplier_id);

    } 

    updateProps = () => {
        this.props.dispath()
    }
    addCart = (product) => {
        const lightProduct = {
            productId: product.productId,
            productName: product.productName,
            image: product.image,
            price: product.price,
            quantity: 1,
        }
        this.props.addToCart(lightProduct);
    } 
    render() {
        //Ket qua search
        console.log("SUPPLIER RENDERED");
        return (
            <Result attr="resProBySupplier" />
        )
    }
}

const mapStateToProps = (state) => ({
    // resProBySupplier: state.appReducer.resProBySupplier,
});

const mapDispatchToProps = ({
    getProBySupplier,
    addToCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
