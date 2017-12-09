import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_product } from './actions';
import NotFound from '../NotFound/index';

class ProductDetail extends Component {
    constructor (props) {
      super(props);
      // this.state = {
      //   prodDetail: {},
      // }
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
        //const prodDetailString = JSON.parse(prodDetail);
        
        if (prodDetail.description){
          info = JSON.parse(JSON.stringify(prodDetail.description.info));

          Object.keys(prodDetail.description.info).forEach(function(key) {
            arr.push({name: key, value: info[JSON.stringify(key)]});
          });
        
          console.log('---All DES INFO---', JSON.stringify(prodDetail.description.info));
          // let mainAttrs = Object.keys(prodDetail.info);
          
        }
        return (
        <div className="span9">
          <ul className="breadcrumb">
          <li><a href="index.html">Home</a> <span className="divider">/</span></li>
          <li><a href="products.html">Products</a> <span className="divider">/</span></li>
          <li className="active">product Details</li>
          </ul>	
          <div className="row">	  
            
                  <div id="gallery" className="span3">
                    <a href="#" title={prodDetail.productName}>
                        <img src={prodDetail.image} style={{ width: "100%" }} alt={prodDetail.productName}/>
                    </a>
                    <div id="differentview" className="moreOptopm carousel slide">
                        {console.log('---PRODETAIL---', prodDetail)}
                        <div className="carousel-inner">
                          <div className="item active">
                            {(prodDetail.description) ? prodDetail.description.imgLinks.map((image, index) => {
                              if (index < 3) {
                                return (
                                  <a href="#" key={index}> 
                                    <img style={{ width: "100%" }} src={image} alt="" />
                                  </a>
                                )}
                            }): ""}
                          </div>
                          <div className="item">
                            <a href="themes/images/products/large/f3.jpg" > <img style={{ width: "29%" }} src="themes/images/products/large/f3.jpg" alt=""/></a>
                            <a href="themes/images/products/large/f1.jpg"> <img style={{ width: "29%" }} src="themes/images/products/large/f1.jpg" alt=""/></a>
                            <a href="themes/images/products/large/f2.jpg"> <img style={{ width: "29%" }} src="themes/images/products/large/f2.jpg" alt=""/></a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="btn-toolbar">
                      <div className="btn-group">
                        <span className="btn"><i className="icon-envelope"></i></span>
                        <span className="btn" ><i className="icon-print"></i></span>
                        <span className="btn" ><i className="icon-zoom-in"></i></span>
                        <span className="btn" ><i className="icon-star"></i></span>
                        <span className="btn" ><i className=" icon-thumbs-up"></i></span>
                        <span className="btn" ><i className="icon-thumbs-down"></i></span>
                      </div>
                    </div>
                    </div>
                    <div className="span6">
                        <h3>{prodDetail.productName !== undefined && prodDetail.productName}  </h3>
                        <hr className="soft"/>
                        <form className="form-horizontal qtyFrm">
                          <div className="control-group">
                            <label className="control-label"><span>{prodDetail.price ? prodDetail.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '0'}Đ</span></label>
                            <div className="controls">
    
                              <button type="submit" className="btn btn-large btn-primary pull-right"> Thêm vào giỏ <i className=" icon-shopping-cart"></i></button>
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
                      <tbody>
                    {Object.keys(info).map(mainAttr => {
                      return (
                        <div>
                        <h4>{mainAttr != "imgKit"? mainAttr: ""}</h4>
                        {mainAttr != "imgKit"? Object.keys(info[mainAttr]).map(subAttr => {
                          return (
                            <tr className="techSpecRow" key={subAttr}>
                              <td className="techSpecTD1">{subAttr} </td>
                              <td className="techSpecTD2">{info[mainAttr][subAttr]}</td>
                            </tr>
                          )
                        }): null}
                        </div>
                      );
                    })}
                      </tbody>
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
  get_product,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
