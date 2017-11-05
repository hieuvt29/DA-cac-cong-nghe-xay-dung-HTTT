// import React from 'react';
import Slider from 'react-slick';
import React from 'react';
import { Link } from 'react-router-dom';

export default class SliderTemp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 500,
      slidesToShow: 3,
      arrows: false,
      autoplay: true,
      touchMove: true,
    }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }

  render() {
    return (
      <div>
            <Slider  ref={c => this.slider = c } {...this.state}>
              {this.props.featuredProducts.map((item, index) => (
            <div className="span3" key={index}>
              <Link to={"/product/"+item.name}><img src="https://images-na.ssl-images-amazon.com/images/I/41mll1%2BvklL._SL500_AC_SS350_.jpg" alt="" /></Link>
              <div className="caption">
                <h5>{item.name}</h5>
                <p>
                  <span>Lorem Ipsum is simply dummy text.</span>
                </p>
                <h4><Link className="btn" to={"/product/"+item.name}> <i className="icon-zoom-in"></i></Link> <a className="btn" href="">Add to <i className="icon-shopping-cart"></i></a>
                  <a className="btn btn-primary" href="">$222.00</a></h4>
              </div>
            </div>
            ))}
            </Slider>
            <button className="left carousel-control" href=""   onClick={this.previous}>‹</button>
            <button className="right carousel-control" href=""  onClick={this.next}>›</button>
            </div>
          );
  }
}