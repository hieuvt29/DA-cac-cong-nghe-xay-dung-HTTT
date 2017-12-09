import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import { addToCart } from './../Cart/actions';
// import SliderTemp from '../../components/SliderTemp';
import { Link } from 'react-router-dom';
import defaultImage from '../../img/laptop-default.jpg';

class Result extends Component {
    constructor (props) {
        super(props);
        this.state = {
            attr: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("Result recieve props: ", nextProps);
        this.setState({...this.props, nextProps});
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
        console.info("Result rendered");
        return (
            <div className="span9">
                <h4>Kết quả tìm kiếm</h4>
                <ul className="thumbnails">
                    { (this.props[this.state.attr]) ? this.props[this.state.attr].map((item, index) => {
                        return (
                        <li className="span3" key={index}>
                            <div className="thumbnail">
                                <Link to={`/product/${item.productId}`}>
                                <img src={(item.image === "/img/default.png")? defaultImage : item.image} alt="" />
                                </Link>
                                <div className="caption">
                                    <h5>{item.productName}</h5>
                                    <p>
                                        <span>{item.quantity}</span>
                                    </p>
                                    <h4>
                                        <Link className="btn" to={`/product/${item.productId}`}> <i className="icon-zoom-in"></i>
                                        </Link>
                                        <a className="btn" onClick={() => this.addCart(item)}>Mua <i className="icon-shopping-cart"></i></a>
                                        <span className="pull-right">{item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}Đ</span>                                        
                                        </h4>
                                </div>
                            </div>
                        </li>
                        )
                    }) : "Không tìm thấy"}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    resProByCategory: state.appReducer.resProByCategory,
    resProBySupplier: state.appReducer.resProByCategory,
    resSearch: state.appReducer.resSearch,
});

const mapDispatchToProps = ({
    addToCart
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);
