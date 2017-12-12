import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_product } from './actions';
import NotFound from '../NotFound/index';
import { addToCart } from './../Cart/actions';
import Lightbox from 'react-image-lightbox';

class ProductDetail extends Component {
    constructor (props) {
      super(props);
      this.state = {
        photoIndex: 0,
        isOpen: false
      };
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
    componentDidMount () {
        // console.log('---TuyenTN---didmount');
        // this.props.req_products();'
        // const that = this;
        // const url = `http://localhost:3001/products/${this.props.match.params.id}`;
        // fetch(url).then(res => { return res.json();})
        // .then(res_json => that.setState({ prodDetail: res_json }))
        // .catch(error => console.log('---TuyenTN---', error));
    }
    componentWillMount() {
      const product_id = this.props.match.params.id;
      console.log("props: ", this.props);
      this.props.get_product(product_id);
    }
    render() {
      if (this.props.prodDetail) {
        const {prodDetail} = this.props;
        let arr = [];
        let info = {};
        const {
          photoIndex,
          isOpen,
        } = this.state;
        let images = [];
        //const prodDetailString = JSON.parse(prodDetail);
        
        if (prodDetail.description){
          images = prodDetail.description.imgLinks;
          info = JSON.parse(JSON.stringify(prodDetail.description.info));
          // Object.keys(prodDetail.description.info).forEach(function(key) {
          //   arr.push({name: key, value: info[JSON.stringify(key)]});
          // });
        
          // console.log('---All DES INFO---', JSON.stringify(prodDetail.description.info));
          // // let mainAttrs = Object.keys(prodDetail.info);
          
        }
        return (
          
        <div className="span9">
          <ul className="breadcrumb">
          <li><a href="index.html">Home</a> <span className="divider">/</span></li>
          <li><a href="products.html">Products</a> <span className="divider">/</span></li>
          <li className="active">product Details</li>
          </ul>	
          <div className="row">
          {isOpen &&
              <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() => this.setState({
                      photoIndex: (photoIndex + images.length - 1) % images.length,
                  })}
                  onMoveNextRequest={() => this.setState({
                      photoIndex: (photoIndex + 1) % images.length,
                  })}
              />
          }
            <div id="gallery" className="span3">
              <a onClick={(e) => {e.preventDefault(); this.setState({ isOpen: true })}} href={prodDetail.image} title={prodDetail.productName}>
                  <img src={prodDetail.image} style={{ width: "100%" }} alt={prodDetail.productName}/>
              </a>
              <div id="differentview" className="moreOptopm carousel slide">
                <div className="carousel-inner">
                  <div className="item active">
                  {(prodDetail.description) ? prodDetail.description.imgLinks.map((image, index) => {
                      if (index < 3) {
                        return (
                          <a onClick={(e) => {e.preventDefault(); this.setState({ isOpen: true })}} href={image} key={index}> 
                            <img style={{ width: "29%" }} src={image} alt={image} />
                          </a>
                        )
                      }
                    }): ""}
                  </div>
                  <div className="item">
                  {(prodDetail.description) ? prodDetail.description.imgLinks.map((image, index) => {
                      if (index >= 3) {
                        return (
                          <a onClick={(e) => {e.preventDefault(); this.setState({ isOpen: true })}} href={image} key={index}> 
                            <img style={{ width: "29%" }} src={image} alt={image} />
                          </a>
                        )
                      }
                    }): ""}
                  </div>
                </div>
              </div>
                
            </div>
            <div className="span6">
                  <h3>{prodDetail.productName !== undefined && prodDetail.productName}  </h3>
                  <hr className="soft"/>
                  <form className="form-horizontal qtyFrm">
                    <div className="control-group">
                      <label className="control-label"><span>{prodDetail.price ? prodDetail.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '0'} &#8363;</span></label>
                      <div className="controls">
                        <a className="btn btn-large btn-primary pull-right" onClick={() => this.addCart(prodDetail)}>Thêm vào giỏ <i className="icon-shopping-cart"></i></a>
                      </div>
                    </div>
                  </form>
                  
                  <hr className="soft"/>
                  <h4>Còn {prodDetail.quantity} sản phẩm</h4>
                  {/* <form className="form-horizontal qtyFrm pull-right">
                    <div className="control-group">
                      <label className="control-label"><span>Màu sắc</span></label>
                      <div className="controls">
                        <select className="span2">
                            <option>Đen</option>
                            <option>Đỏ</option>
                            <option>Xanh</option>
                            <option>Xám</option>
                          </select>
                      </div>
                    </div>
                  </form> */}
                  <hr className="soft clr"/>
                  <p>
                  {/* { prodDetail.description ? JSON.stringify(prodDetail.description.info) : "null"} */}
                  
                  </p>
                  <br className="clr"/>
              <a href="" name="detail"></a>
              <hr className="soft"/>
            </div>
            
            <div className="span9">
              <ul id="productDetail" className="nav nav-tabs">
                <li className="active"><a href="home" data-toggle="tab">Chi tiết sản phẩm</a></li>
              </ul>
            
              <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active in" id="home">
                  <h4>Thông tin sản phẩm</h4>
                      
                  <table className="table table-bordered">
                    {Object.keys(info).map((mainAttr, index) => {
                      return (
                        <tbody key={index}>
                        <tr><td style={{fontSize: "1.5em", fontWeight: "bold"}} colSpan="2">{mainAttr != "imgKit"? mainAttr: ""}</td></tr>
                        {mainAttr != "imgKit"? Object.keys(info[mainAttr]).map(subAttr => {
                          return (
                            <tr className="techSpecRow" key={subAttr}>
                              <td className="techSpecTD1">{subAttr} </td>
                              <td className="techSpecTD2">{info[mainAttr][subAttr]}</td>
                            </tr>
                          )
                        }): null}
                        </tbody>
                      );
                    })}
                  </table>

                </div>
              <br className="clr"/>
              </div>
            </div>
          </div>
        </div>
        );
      } else {
        return (
          <NotFound />
        )
      }
      
    }
}

const mapStateToProps = (state) => ({
  prodDetail: state.appReducer.resDetailProduct,
});

const mapDispatchToProps = ({
  get_product, addToCart
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
