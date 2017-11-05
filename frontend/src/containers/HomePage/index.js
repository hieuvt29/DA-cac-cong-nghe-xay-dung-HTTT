import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import { increase, req_products } from './actions';
import SliderTemp from '../../components/SliderTemp';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount () {
        // console.log('---TuyenTN---didmount');
        this.props.req_products();
    }
    
    render() {
        console.log('---TuyenTN---', this.props);
        let featuredProducts = [];
        let temp = [];
        this.props.featuredProducts.map((item, index) => {
            if (index % 4 === 3) {
                temp.push(item);
                featuredProducts.push(temp);
                temp = [];
            } else {
                temp.push(item);
            }
        })
        
        console.log(' FeaturedProducts = ', featuredProducts);
        return (
            <div className="span9">
                <div className="well well-small">
                    <h4>Featured Products <small className="pull-right">200+ featured products</small></h4>
                    <div className="row-fluid">
                        <div id="featured" className="carousel slide">
                            <div className="carousel-inner">                
                                { console.log(featuredProducts)}
                                {featuredProducts.map((group, indexGroup) => {
                                    return (
                                    <div className="item" key={`_${indexGroup}`}>
                                        <ul className="thumbnails">
                                            {group.map((item, index) => (
                                                <li className="span3" key={item.id}>
                                                    <div className="thumbnail">
                                                        <Link to={`/product/${item.id}`}><img src={item.image} alt="" />
                                                        </Link>
                                                        <div className="caption">
                                                            <h5>{item.productName}</h5>
                                                            <p>
                                                                <span>{item.quantity}</span>
                                                                </p>
                                                            <h4><Link className="btn" to="/product/1"> <i className="icon-zoom-in"></i></Link>
                                                            <a className="btn" href="">Add to <i className="icon-shopping-cart"></i></a>
                                                            <a className="btn btn-primary" href="">${item.price}</a></h4>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    )}
                                )}
                            </div>
                        </div>
                    </div>                    
                </div>
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
});

const mapDispatchToProps = ({
    increase,
    req_products,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
