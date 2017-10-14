import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increase } from './actions';

class HomePage extends Component {
    render() {
        console.log('---TuyenTN---', this.props.latestProducts);
        return (
            // <div className="App">
            //     <p className="App-intro">
            //         this is Home Page!
            //         <br />
            //         count: {this.props.count}
            //         <button
            //             onClick={() => this.props.increase()}
            //         >Increase</button>
                    
            //     </p>
            // </div>
            <div className="span9">
                <div className="well well-small">
                    <h4>Featured Products <small className="pull-right">200+ featured products</small></h4>
                    <div className="row-fluid">
                        <div id="featured" className="carousel slide">
							<div className="carousel-inner">
								<div className="item active">
                                    <ul className="thumbnails">
                                    </ul>
                                </div>
                                <div className="item">
                                    <ul className="thumbnails">
                                    </ul>
                                </div>
                            </div>
                            <a className="left carousel-control" href="#featured" data-slide="prev">‹</a>
							<a className="right carousel-control" href="#featured" data-slide="next">›</a>
                        </div>
                    </div>
                </div>
                <h4>Latest Products </h4>
                <ul className="thumbnails">
                    {this.props.latestProducts.map((item, index) => (
                        <li className="span3" key={index}>
                            <div className="thumbnail">
                                <a href="product_details.html"><img src="http://localhost:3000/css/themes/images/products/6.jpg" alt="" /></a>
                                <div className="caption">
                                    <h5>{item.name}</h5>
                                    <p>
                                        Lorem Ipsum is simply dummy text.
                                        </p>
                                    <h4><a className="btn" href="product_details.html"> <i className="icon-zoom-in"></i></a> <a className="btn" href="#">Add to <i className="icon-shopping-cart"></i></a>
                                        <a className="btn btn-primary" href="#">$222.00</a></h4>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.appReducer.count,
    listItems: state.appReducer.listItems,
    latestProducts: state.appReducer.latestProducts,
});

const mapDispatchToProps = ({
    increase,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
