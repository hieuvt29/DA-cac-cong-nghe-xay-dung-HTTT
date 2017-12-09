import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import { increase, req_products } from './actions';
import { addToCart } from './../Cart/actions';
// import SliderTemp from '../../components/SliderTemp';
import { Link } from 'react-router-dom';
import defaultImage from '../../img/laptop-default.jpg';

class HomePage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            separatedProduct: this.props.featuredProducts,
        };
    }
    componentDidMount () {
        // console.log('---TuyenTN---didmount');
        
        // this.setState({ separatedProduct: featuredProducts });
        // this.setState((featuredProducts) => {
        //     return {separatedProduct: featuredProducts}
        // });
        console.log('ALL ====== \n', this.props.history);
    }
    componentWillMount() {
             
        this.props.req_products();
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.resSearch) !== JSON.stringify(nextProps.resSearch)) // Check if it's a new user, you can also use some unique, like the ID
        {
            console.log('--UPDATEEEEEE--' );
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
        // let featuredProducts = [];
        // let temp = [];
        // this.props.featuredProducts.map((item, index) => {
        //     if (index % 4 === 3) {
        //         temp.push(item);
        //         featuredProducts.push(temp);
        //         temp = [];
        //     } else {
        //         temp.push(item);
        //     }
        // });
        if (this.props.resSearch.length === 0) {
        return (
            <div className="span9">
                <div className="well well-small">
                    <h4>Sản phẩm nổi bật <small className="pull-right">200+ featured products</small></h4>
                    <div className="row-fluid">
                        <div id="featured" className="carousel slide">
                            <div className="carousel-inner">
                                {console.log('---This props FeaturedProduct---', this.props.featuredProducts)}
                                { (this.props.featuredProducts) ? this.props.featuredProducts.map((group, indexGroup) => {
                                    return (
                                    <div key={indexGroup} className={`item ${ (indexGroup === 0) ? 'active' : ''}`} key={`_${indexGroup}`}>
                                        <ul className="thumbnails">
                                            {group.map((item, index) => (
                                                <li className="span3" key={item.productId}>
                                                    <div className="thumbnail">
                                                        <i className="tag"></i>
                                                        <Link to={`/product/${item.productId}`}><img src={(item.image === "/img/default.png")? defaultImage : item.image} alt="" />
                                                        </Link>
                                                        <div className="caption">
                                                            <h5>{item.productName}</h5>
                                                            <h4><Link className="btn" to={`/product/${item.productId}`}>Chi tiết</Link>
                                                                <a className="btn" onClick={ () => this.addCart(item) }>Mua<i className="icon-shopping-cart"></i></a>                                    
                                                                <span className="pull-right">{item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}Đ</span>                                                                                                    
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    )}
                                ) : (<span>Hết hàng</span>)}
                            </div>
                            <a className="left carousel-control" href="#featured" data-slide="prev">‹</a>
			                <a className="right carousel-control" href="#featured" data-slide="next">›</a>
                        </div>
                    </div>                    
                </div>

                <h4>Sản phẩm mới </h4>
                <ul className="thumbnails">
                    {this.props.listProducts.map((item, index) => (
                        <li className="span3" key={index}>
                            <div className="thumbnail">
                                <Link to={`/product/${item.productId}`}><img src={(item.image === "/img/default.png")? defaultImage : item.image} alt="" />
                                </Link>
                                <div className="caption">
                                    <h5>{item.productName}</h5>
                                    <h4><Link className="btn" to={`/product/${item.productId}`}>Chi tiết</Link>
                                    <a className="btn" onClick={ () => this.addCart(item) }>Mua<i className="icon-shopping-cart"></i></a>
                                    <span className="pull-right">{item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}Đ</span>
                                    </h4>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        );}
        //Ket qua search
        return (
            <div className="span9">
                <h4>Kết quả tìm kiếm</h4>
                <ul className="thumbnails">
                    { (this.props.resSearch) ? this.props.resSearch.map((item, index) => {
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
    count: state.appReducer.count,
    listItems: state.appReducer.listItems,
    latestProducts: state.appReducer.latestProducts,
    featuredProducts: state.appReducer.featuredProducts,
    listProducts: state.appReducer.listProducts,
    resSearch: state.appReducer.resSearch,
});

const mapDispatchToProps = ({
    increase,
    req_products,
    addToCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
