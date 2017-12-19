import React from 'react';
import $ from 'jquery';

import 'datatables.net-bs/js/dataTables.bootstrap.js';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
// import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-responsive';
import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'datatables.net-editor';
// import 'datatables.altEditor.free/js/altEditor/dataTables.altEditor.free.js';
// import {LargeModal} from './Modal';
import { Modal, Button, ButtonToolbar, Form, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { address } from '../config';
import 'react-notifications/lib/notifications.css';
import stateOfOrder from '../common/order-states';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      tableName: props.tableName,
      modalShow: false,
      modalData: {},
      createPageShow: 'none',
      username: '',
      password: '',
      repassword: '',
      firstName: '',
      lastName: '',
      gender: 'khac',
      dob: '',
      email: '',
      telephone: '',
      address: '',
      error: '',
      showError: 'hide',
      response: {},
      arrText: [],
      productName: '',
      categories: props.categories,
      suppliers: props.suppliers,
      price: '',
      quantity: '',
      image: '/img/testproduct',
      description: '',
      categoryName: '',
      parentId: '',
      supplierName: '',
      address: '',
      contact: '',
      type: '',
      categoryId:'',
      supplierId:'',
    }

    this.edit = this.edit.bind(this);
  }

  createNotification = (type, message) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  componentWillReceiveProps(nextProps) {
    console.log("Props recieved: ", nextProps.data);
    let changed = (this.state.data !== nextProps.data);
    if (changed) {
      this.renderTable(nextProps.data);
      this.setState({ modalShow: false });
    }
    console.log('---Changed---', changed);
  }

  componentWillUnMount() {
    $(this.refs.dataTable).DataTable().destroy(true);
  }
  componentWillMount() {
  }
  renderTable(data) {
    console.log("table rendered");
    let tableTemplate = this.refs.dataTable;
    if (data && data.length === 0) {
      $(tableTemplate).DataTable({
        data: [],
        columns: [
          { title: 'ID' },
          { title: 'Name' }
        ]
      });
    } else {
      let dataRows = (!data) ? null : data.map(obj => {
        let keys = Object.keys(obj);
        // console.log('Keys = ', keys);
        // return keys.reduce((arr, attr) => arr.concat(obj[attr]),[]);
        return keys.reduce((arr, attr) => {
          if (this.state.tableName === "Orders" && attr === "Products") {
            const stringPros = obj[attr].map(product => product.productName + ' ( ' + product['Orders-Products'].orderQuantity + ' sản phẩm )');
            console.log('---Stringprop---', stringPros);
            return arr.concat(stringPros);
          } else if (this.state.tableName === "Products" && attr === "description") {
            const stringPros = Object.keys(obj[attr]).join(', ') + '...';
            return arr.concat(stringPros);
          } else if (this.state.tableName === "Products" && attr === "Categories") {
            const stringPros = obj[attr].reduce((str, cate) => str+cate.categoryName+ ', ', '');
            return arr.concat(stringPros);
          } else if (this.state.tableName === "Products" && attr === "Supplier") {
            const stringPros = obj[attr].supplierName;
            return arr.concat(stringPros);
          } else {  
            return arr.concat(obj[attr]);
          }
        }, []);
        
      });
      let columns = Object.keys(data[0]).map(key => ({ title: key }));

      $(tableTemplate).DataTable({
        data: dataRows,
        columns: columns,
        "scrollX": true,
        select: 'single'
      });
    }
  }
  showCreate = () => {
    this.setState({ createPageShow: 'block' });
  }

  closeError = () => {
    this.setState({ showError: 'hide' });
  }

  change = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitCat = () => {
    this.setState({ createPageShow: 'none' });
    fetch(address+"/categories/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        categoryName: this.state.categoryName,
        description: this.state.description,
        parentId: this.state.parentId,
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      alert(data.message);
      window.location.reload();
    });
  }
  submitSup = () => {
    this.setState({ createPageShow: 'none' });
    fetch(address+"/suppliers/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        supplierName: this.state.supplierName,
        address: this.state.address,
        type: this.state.type,
        contact: this.state.contact,
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      alert(data.message);
      window.location.reload();
    });
  }
  submitPro = () => {
    this.setState({ createPageShow: 'none' });
    const bodyObject = {
      productName: this.state.productName,
      Categories: [{ categoryId: this.state.categoryId }],
      supplierId: this.state.supplierId,
      price: parseInt(this.state.price),
      quantity: parseInt(this.state.quantity),
      image: this.state.image,
      description: { description: this.state.description },
    };
    console.log('---BODY POST---', bodyObject);
    fetch(address+"/products/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(bodyObject)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      alert(data.message);
      window.location.reload();
    });
  }

  submitAcc = () => {}
  edit(e) {
    e.preventDefault();
    let table = this.refs.dataTable;
    let rowInfo = [];
    let columns = [];
    $(table).find('th').each(function () {
      columns.push($(this).text());
    });
    $(table).find('.selected').find('td').each(function () {
      rowInfo.push($(this).text());
    });

    // console.log("selected: ", rowInfo, columns);
    if (rowInfo.length !== 0) {
      let modalData = [];
      for (let i = 0; i < rowInfo.length; i++) {
        modalData.push({ title: columns[i], text: rowInfo[i] });
      }
      this.setState({ modalAction: "edit", modalShow: true, modalData }, () => console.log('---TuyenTN---modalData', this.state.modalData));
    }
  }
  changeModalItemText = (e, index) => {
    const modalData = this.state.modalData.map((item, i) => {
      if (i === index) {
        // console.log("Item in modalData: ", e.target);
        return { ...item, text: e.target.value }
      }
      return item;
    });
    this.setState({ modalData });
  }
  submit = () => {
    // console.log('---TuyenTN---datatatdtagda', this.state.modalData);
    this.props.submit(this.state.modalData);
  }

  remove = (e) => {
    e.preventDefault();
    let table = this.refs.dataTable;
    let id = $(table).find('.selected').find('td:first-child').text();
    let the_name = $(table).find('.selected').find('td:nth-child(2)').text();
    let cf = window.confirm("Chắc chắn xóa "+ the_name + "?");
    if (cf) {
      console.log('The id of selected row in remove function', id);
      this.props.remove(id);
      $(table).find('.selected').hide();
    }
  }
  render() {
    return (
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">{this.state.tableName}</h3>
              </div>
              <div className="box-body">
                <ButtonToolbar>
                  <Button className="create_btn" onClick={this.showCreate}>New</Button>
                  <a className="btn btn-primary" onClick={this.edit}>
                    Edit
                  </a>
                  <Button className="delete_btn" onClick={this.remove}>Delete</Button>
                  <LargeModal
                    submit={this.submit}
                    action={this.state.modalAction}
                    show={this.state.modalShow}
                    change={this.changeModalItemText}
                    modaldata={this.state.modalData}
                    tableName={this.state.tableName}
                    onHide={() => this.setState({ modalShow: false })}
                    categories={this.props.categories? this.props.categories: null}
                  />
                </ButtonToolbar>
                <hr />
                <table id="example1" className="dataTable table table-bordered table-striped" ref="dataTable">

                </table>
              </div>
              {(this.state.tableName === "Products") ? (
                <div className="create_form" style={{ display: this.state.createPageShow }}>
                <Form horizontal>
                    <h4> Thông tin sản phẩm </h4>

                    <div className="control-group">
                      <label className="control-label" htmlFor="productName">Tên sản phẩm <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="productName" name="productName" onChange={this.change} value={this.state.productName} placeholder="Ten sp" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="categoryId">Loại sản phẩm <sup>*</sup></label>
                      <div className="controls">
                        <select value={this.state.categoryId} className="select_pro" name="categoryId" onChange={this.change}>
                            <option>Chọn một</option>
                          {this.props.categories.map((category, index) => (
                            <option value={category.categoryId} key={index} defaultChecked={index === 1? "selected" : ''}>{category.categoryName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="supplierId">Nhà cung cấp <sup>*</sup></label>
                      <div className="controls">
                        <select value={this.state.supplierId} className="select_pro" name="supplierId" onChange={this.change}>
                        <option>Chọn một</option>
                          {this.props.suppliers.map((supplier, index) => (
                            <option value={supplier.supplierId} key={index} defaultChecked={index === 1? "selected" : ''}>{supplier.supplierName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="price">Giá <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="price" name="price" onChange={this.change} value={this.state.price} placeholder="" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="quantity">Số lượng <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="quantity" name="quantity" onChange={this.change} value={this.state.quantity} placeholder="" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="image">Link ảnh <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="image" name="image" onChange={this.change} value={this.state.image} placeholder="" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="description">Mô tả <sup>*</sup></label>
                      <div className="controls">
                        <textarea value={this.state.description} id="description" name="description" onChange={this.change} />
                      </div>
                    </div>

                  <div className="control-group">
                    <div className="controls">
                    <Button bsStyle="primary" onClick={this.submitPro}>Thêm sản phẩm</Button>
                    </div>
                    <span className="controls">
                      <Button className="btn btn-large btn-close" onClick={() => { this.setState({ createPageShow: 'none' }) }}>Đóng</Button>
                    </span>
                  </div>
                  </Form>
                </div>
              ) : (this.state.tableName === "Categories") ? (
                <div className="create_form" style={{ display: this.state.createPageShow }}>
                <Form horizontal>
                    <h4> Thêm loại sản phẩm </h4>

                    <div className="control-group">
                      <label className="control-label" htmlFor="categoryName">Tên loại <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="categoryName" name="categoryName" onChange={this.change} value={this.state.categoryName} placeholder="Ten loai sp" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="description">Mô tả <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="description" name="description" onChange={this.change} value={this.state.description} placeholder="" />
                      </div>
                    </div>
                    <div className="control-group">
                      <label className="control-label" htmlFor="parentId">Nếu là sub-category, chọn Loại sản phẩm cha:</label>
                      <div className="controls">
                        <select value={this.state.parentId} className="" name="parentId" onChange={this.change}>
                          <option value="">Không</option>
                          {this.props.categories.map((category, index) => (
                            <option value={category.categoryId} key={index} defaultChecked={index === 1 ? "selected" : ''}>{category.categoryName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="control-group">
                      <div className="controls">
                    <Button bsStyle="primary" onClick={this.submitCat}>Thêm loại sản phẩm</Button>
                    </div>
                    <span className="controls">
                      <Button className="btn btn-large btn-close" onClick={() => { this.setState({ createPageShow: 'none' }) }}>Đóng</Button>
                    </span>
                  </div>
                  </Form>
                </div>
              ) : (this.state.tableName === "Suppliers") ? (
                <div className="create_form" style={{ display: this.state.createPageShow }}>
                <Form horizontal>
                    <h4> Thêm nhà cung cấp </h4>

                    <div className="control-group">
                      <label className="control-label" htmlFor="supplierName">Tên nhà cung cấp <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="supplierName" name="supplierName" onChange={this.change} value={this.state.supplierName} placeholder="Ten ncc" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="address">Địa chỉ <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="address" name="address" onChange={this.change} value={this.state.address} placeholder="" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="type">Loại <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="type" name="type" onChange={this.change} value={this.state.type} placeholder="" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="contact">Liên hệ <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="contact" name="contact" onChange={this.change} value={this.state.contact} placeholder="" />
                      </div>
                    </div>

                  <div className="control-group">
                    <div className="controls">
                    <Button bsStyle="primary" onClick={this.submitSup}>Thêm nhà cung cấp</Button>
                    </div>
                    <span className="controls">
                      <Button className="btn btn-large btn-close" onClick={() => { this.setState({ createPageShow: 'none' }) }}>Đóng</Button>
                    </span>
                  </div>
                  </Form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
class LargeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.userName,
      password: props.password,
      repassword: props.repassword,
      firstName: props.firstName,
      lastName: props.lastName,
      gender: 'khac',
      dob: props.dob,
      email: props.email,
      telephone: props.telephone,
      address: props.address,
      error: props.error,
      showError: props.showError,
      response: props.userName,
      password: props.password,
      repassword: props.repassword,
      firstName: props.firstName,
      lastName: props.lastName,
      gender: 'khac',
      dob: props.dob,
      email: props.email,
      telephone: props.telephone,
      address: props.address,
      error: props.error,
      response: {},
      modaldata: '',
      arrText: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   username: nextProps.userName,
    //   password: nextProps.password,
    //   repassword: nextProps.repassword,
    //   firstName: nextProps.firstName,
    //   lastName: nextProps.lastName,
    //   gender: 'khac',
    //   dob: nextProps.dob,
    //   email: nextProps.email,
    //   telephone: nextProps.telephone,
    //   address: nextProps.address,
    //   error: nextProps.error,
    //   showError: nextProps.showError,
    //   response: {},
    //   show: true,
    //   modaldata: nextProps.modaldata,
    // });
    // console.log("nextProps: ", nextProps);
    // console.log("state: ", this.state);
  }

  /**
   * @param {Event} e
   */
  change(e) {
    this.set;
  };

  isArray = (value) => {
    return value && typeof value === 'object' && value.constructor === Array;
  };

  render() {
    // console.log("state: ", this.state);
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form role="form">
            <div className="box-body" ref={abc => { this.abc = abc; }}>
              {this.props.show ? this.props.modaldata.map((item, index) => {
                let action = this.props.action;
                let val = action === "edit" ? (item.text) : "";

                if (this.props.tableName === "Orders") {
                  if (item.title === 'state') {
                    return (
                      <div key={"index-" + item.title} className="form-group">
                        {/* {console.log('---TuyenTN--- Thiss is state')} */}
                        <label htmlFor={item.title}>{item.title}</label>
                        <div className="controls">
                          <select value={val} className="" id={item.title} name={item.title} onChange={e => this.props.change(e, index)}>
                            {Object.keys(stateOfOrder).map((state, index) => (
                              <option value={state} key={index}>{state}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )
                  } else if (item.title === 'deliveryDate' || item.title === 'address' || item.title === 'telephone') {
                    return (
                      <div key={"index-" + item.title} className="form-group">
                        <label htmlFor={item.title}>{item.title}</label>
                        <div className="controls">
                        <input type="text" className="form-control" onChange={e => this.props.change(e, index)}
                          id={item.title} name={item.title} placeholder={"Enter " + item.title} value={val} />
                        </div>
                      </div>
                    )
                  }
                  
                } else if (this.props.tableName === "Categories" && item.title === 'parentId') {
                  return (
                    <div key={"index-" + item.title} className="form-group">
                      {/* {console.log('---TuyenTN--- Thiss is state', this.props.categories)} */}
                      <label htmlFor={item.title}>{item.title}</label>
                      <div className="controls">
                        <select value={val} className="" id={item.title} name={item.title} onChange={e => this.props.change(e, index)}>
                          <option value="">Không</option>
                          {/* {console.log('---item.value---', this.props.modaldata[1].text)} */}
                          {this.props.categories.filter(category => category.categoryId !== this.props.modaldata[0].text).map((category, idx) => (
                              <option value={category.categoryId} key={idx} defaultChecked={index === 1 ? "selected" : ''}>{category.categoryName}</option>
                          )
                          )}
                        </select>
                      </div>
                    </div>
                  )
                }
                else {
                  //console.log(val);
                  if (item.title.includes('is')) {
                    return (
                      <div className="checkbox" key={"index-" + item.title}>
                        <label>
                          <input type="checkbox" id={item.title} name={item.title} defaultChecked={val} />{item.title}
                        </label>
                      </div>
                    )
                  } else if (item.title === 'Products') {
                    return (
                      <div key={"index-" + item.title} className="form-group">
                        {/* {val.map((product, index) => (
                        <p>
                          {product.productName + ' : ' + product['Orders-Products'].orderQuantity} 
                        </p>
                      ))} */}
                      </div>
                    )
                  } else {
                    return (
                      <div key={"index-" + item.title} className="form-group">
                        <label htmlFor={item.title}>{item.title}</label>
                        <input type="text" className="form-control" onChange={e => this.props.change(e, index)}
                          id={item.title} name={item.title} placeholder={"Enter " + item.title} value={val} />
                      </div>
                    )
                  }
                }
              }) : null}
            </div>

            <div className="box-footer">
              <button type="button" onClick={this.props.submit} className="btn btn-primary">Submit</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default DataTable;