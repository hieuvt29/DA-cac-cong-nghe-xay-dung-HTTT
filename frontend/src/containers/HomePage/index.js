import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import { increase, req_products } from './actions';
import { addToCart } from './../Cart/actions';
// import SliderTemp from '../../components/SliderTemp';
import { Link } from 'react-router-dom';
import defaultImage from '../../img/laptop-default.jpg';
import Result from '../Result/index';
import {search} from '../Header/actions';
import AlertContainer from 'react-alert'

class HomePage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            separatedProduct: this.props.featuredProducts,
            isSearching: false
        };
    }
    componentDidMount () {
        window.scrollTo(0, 0);
    }
    componentWillMount() {
             
        this.props.req_products();
    }

    componentWillReceiveProps(nextProps) {
        let searchStr = nextProps.location.search;
        const params = new URLSearchParams(searchStr); 
        const keywords = params.get('searchKey');
        if (keywords && keywords != "") {
            this.props.search(keywords);
            this.setState({isSearching: true});
        } else {
            this.setState({isSearching: false});
        }
    } 

    updateProps = () => {
        this.props.dispath()
    }

    addCart = (product) => {
        let quantity = product.quantity;
        if (quantity == 0) {
            this.msg.show("Đã hết hàng, vui lòng chọn mặt hàng khác!", {
                time: 1000,
                type: 'info'
            });
        } else {
            const lightProduct = {
                productId: product.productId,
                productName: product.productName,
                image: product.image,
                price: product.price,
                quantity: 1,
            }
            product.quantity -= 1;
            this.props.addToCart(lightProduct);
            this.msg.show("Đã thêm sản phẩm vào giỏ hàng!", {
                time: 1000,
                type: 'success'
            });
        }
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
        if (!this.state.isSearching) {
        return (
            <div className="span9">
            <AlertContainer ref={a => this.msg = a} {...{offset: 14, position: 'bottom left', theme: 'dark', time: 5000, transition: 'scale'}} />
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
                                                                <span className="pull-right">{item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} &#8363;</span>                                                                                                    
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
                                    <span className="pull-right">{item.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} &#8363;</span>
                                    </h4>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        );}
        else {
        //Ket qua search
        return (
            <Result attr="resSearch" />
        )}
    }
}

const mapStateToProps = (state) => ({
    count: state.appReducer.count,
    listItems: state.appReducer.listItems,
    latestProducts: state.appReducer.latestProducts,
    featuredProducts: state.appReducer.featuredProducts,
    listProducts: state.appReducer.listProducts,
    // resSearch: state.appReducer.resSearch,
});

const mapDispatchToProps = ({
    increase,
    req_products,
    addToCart,
    search
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
