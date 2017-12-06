import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import { getProByCategory } from './actions';
import { addToCart } from './../Cart/actions';
// import SliderTemp from '../../components/SliderTemp';
import { Link } from 'react-router-dom';
import defaultImage from '../../img/laptop-default.jpg';

class Category extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount () {

    }
    componentWillMount() {
        const category_id = (this.props.match.params.id === '') ? this.props.match.params.id : '2ce4b283-88df-46bf-b149-d798f0e5ff27';
        this.props.getProByCategory(category_id);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.resSearch) !== JSON.stringify(nextProps.resSearch)) // Check if it's a new user, you can also use some unique, like the ID
        {
            this.forceUpdate();
        }
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
        return (
            <div className="span9">
                <h4>Kết quả tìm kiếm</h4>
                <ul className="thumbnails">
                    { (this.props.resProByCategory) ? this.props.resProByCategory.map((item, index) => {
                        return (
                        <li className="span3" key={index}>
                            <div className="thumbnail">
                            <Link to={`/product/${item.productId}`}><img src={(item.image === "/img/default.png")? defaultImage : item.image} alt="" />
                                </Link>
                                <div className="caption">
                                    <h5>{item.productName}</h5>
                                    <p>
                                        <span>{item.quantity}</span>
                                    </p>
                                    <h4><Link className="btn" to={`/product/${item.productId}`}> <i className="icon-zoom-in"></i></Link>
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
});

const mapDispatchToProps = ({
    getProByCategory,
    addToCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
