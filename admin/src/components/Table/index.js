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
import 'react-notifications/lib/notifications.css';

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
      categoryId: '2b18291f-8c06-43d8-8b27-56b59e88c68d',
      supplierId: '89ce332c-f574-4ab9-9f5c-d51bd15ede4a',
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
    let changed = this.state.data !== nextProps.data;
    changed ? this.renderTable(nextProps.data) : null;
  }

  componentWillUnMount() {
    $(this.refs.dataTable).DataTable().destroy(true);
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
        return keys.reduce((arr, attr) => arr.concat(obj[attr]), []);
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
    fetch("http://localhost:3001/categories/", {
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
    })
      .then((response) => {
        this.setState({ response: response });
      });
  }
  submitSup = () => {
    this.setState({ createPageShow: 'none' });
    fetch("http://localhost:3001/suppliers/", {
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
    })
      .then((response) => {
        console.log('---RESPONSE---', (response));
        if (response.error) {
          this.createNotification('error', response.error);
        } else {
          this.createNotification('success', response.message);
          this.setState({ response: response });
        }
      });
  }
  submitPro = () => {
    this.setState({ createPageShow: 'none' });
    fetch("http://localhost:3001/products/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        productName: this.state.productName,
        Categories: [{ categoryId: this.state.categoryId }],
        supplierId: this.state.supplierId,
        price: parseInt(this.state.price),
        quantity: parseInt(this.state.quantity),
        image: this.state.image,
        description: { description: this.state.description },
      })
    })
      .then((response) => {
        this.setState({ response: response });
      });
  }

  submitAcc = () => {
    this.setState({ showError: '' });
    let re = /^\w+$/;
    if (this.state.username === '') {
      this.setState({ error: 'Username cannot blank', password: '' });
    }
    else if (!re.test(this.state.username)) {
      this.setState({ error: 'Username must contain only letters, numbers and underscores!' });
    }
    else if (this.state.email === '') {
      this.setState({ error: 'Vui lòng nhập email!' });
    }
    else if (this.state.firstName === '' || this.state.lastName === '') {
      this.setState({ error: 'Vui lòng nhập đầy đủ họ và tên' });
    }
    else if (this.state.password === '') {
      this.setState({ error: 'Password cannot blank' });
    }
    else if (this.state.password !== this.state.repassword) {
      this.setState({ error: 'Please check that you\'ve entered and confirmed your password!' });
    }
    else if (this.state.password === this.state.repassword) {
      if (this.state.password.length < 4) {
        this.setState({ error: 'Password must contain at least six characters!', password: '' });
      }
      if (this.state.password === this.state.username) {
        this.setState({ error: 'Password must be different from Username!' });
      }
      re = /[0-9]/;
      if (!re.test(this.state.password)) {
        this.setState({ error: 'password must contain at least one number (0-9)!' });
      }
      re = /[a-z]/;
      if (!re.test(this.state.password)) {
        this.setState({ error: 'password must contain at least one lowercase letter (a-z)!' });
      } else {
        this.setState({ createPageShow: 'none' });
        fetch("http://localhost:3001/register/", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          //make sure to serialize your JSON body
          body: JSON.stringify({
            userName: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            gender: this.state.gender,
            address: this.state.address,
            telephone: this.state.telephone,
          })
        })
          .then((response) => {
            this.setState({ response: response });
          });
      }
    }
  };
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

    console.log("selected: ", rowInfo, columns);
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
      if (i === index) return { ...item, text: e.target.value }
      return item;
    });
    this.setState({ modalData });
  }
  submit = () => {
    console.log('---TuyenTN---datatatdtagda', this.state.modalData);
    this.props.submit(this.state.modalData);
  }

  remove = (e) => {
    e.preventDefault();
    let table = this.refs.dataTable;
    let id = $(table).find('.selected').find('td:first-child').text();
    console.log('The id of selected row in remove function', id);
    this.props.remove(id);
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
                    onHide={() => this.setState({ modalShow: false })}
                  />
                </ButtonToolbar>
                <hr />
                <table id="example1" className="dataTable table table-bordered table-striped" ref="dataTable">

                </table>
              </div>
              {this.state.tableName === "Customers" ? (
                <div className="create_form" style={{ display: this.state.createPageShow }}>
                  <Form horizontal>
                    <h3> Thông tin tài khoản </h3>
                    <hr className="soft"/>
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Tên đăng nhập <sup>*</sup></Col>
                      <Col sm={10}>
                        <input type="text" id="input_username" autoComplete="false" name="username" onChange={this.change} value={this.state.username} placeholder="Username" />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Mật khẩu <sup>*</sup></Col>
                      <Col sm={10}>
                        <input type="password" id="inputPassword1" name="password" onChange={this.change} value={this.state.password} placeholder="Password" />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Nhập lại mật khẩu <sup>*</sup></Col>
                      <Col sm={10}>
                        <input type="password" id="inputPassword2" name="repassword" onChange={this.change} value={this.state.repassword} placeholder="Retype Password" />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Email <sup>*</sup></Col>
                      <Col sm={10}>
                        <input type="text" id="email" autoComplete="false" name="email" onChange={this.change} value={this.state.email} placeholder="Email" />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Họ <sup>*</sup></Col>
                      <Col sm={10}>
                        <input type="text" id="firstName" name="firstName" onChange={this.change} value={this.state.firstName} placeholder="Ho" />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Tên <sup>*</sup></Col>
                      <Col sm={10}>
                        <input type="text" id="lastName" name="lastName" onChange={this.change} value={this.state.lastName} placeholder="Ten" />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Giới tính</Col>
                      <div className="controls">
                        <input type="radio" id="nam" name="gender" checked={this.state.gender === "nam"} onChange={this.change} value="nam" /><label htmlFor="nam" style={{ display: 'inline' }}>Nam</label>
                        <input type="radio" id="nu" name="gender" checked={this.state.gender === "nu"} onChange={this.change} value="nu" /><label htmlFor="nu" style={{ display: 'inline' }}>Nữ</label>
                        <input type="radio" id="khac" name="gender" checked={this.state.gender === "khac"} onChange={this.change} value="khac" /><label htmlFor="khac" style={{ display: 'inline' }}>Khác</label>
                      </div>
                      </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Số điện thoại <sup>*</sup></Col>
                      <Col sm={10}>
                        <input type="text" id="telephone" name="telephone" onChange={this.change} value={this.state.telephone} placeholder="+84" />
                      </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>Địa chỉ</Col>
                      <Col sm={10}>
                        <input type="text" id="address" name="address" onChange={this.change} value={this.state.address} placeholder="Dia chi" />
                      </Col>
                    </FormGroup>

                    <div style={{ width: '83.33333333%' }} className={"form-group alert alert-block alert-error fade in" + this.state.showError}>
                      <button type="button" className="close" onClick={this.closeError} data-dismiss="alert">×</button>
                      <strong>{this.state.error}</strong>
                    </div>

                    <p><sup>*</sup>Bắt buộc </p>
                      <Button bsStyle="primary" onClick={this.submitAcc}>Đăng kí</Button>
                    <span className="controls" style={{marginLeft: '30px'}}>
                      <Button onClick={() => { this.setState({ createPageShow: 'none' }) }}>Đóng</Button>
                    </span>
                  </Form>
                </div>
              ) : (this.state.tableName === "Products") ? (
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
                        <input type="text" id="categoryId" name="categoryId" onChange={this.change} value={this.state.categoryId} placeholder="" />
                      </div>
                    </div>

                    <div className="control-group">
                      <label className="control-label" htmlFor="supplierId">Mã nhà cung cấp <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="supplierId" name="supplierId" onChange={this.change} value={this.state.supplierId} placeholder="" />
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
                        <input type="text" id="description" name="description" onChange={this.change} value={this.state.description} placeholder="" />
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
                    <div>Nếu là loại sub-category:</div>
                    <div className="control-group">
                      <label className="control-label" htmlFor="parentId">Mã parent category <sup>*</sup></label>
                      <div className="controls">
                        <input type="text" id="parentId" name="parentId" onChange={this.change} value={this.state.parentId} placeholder="" />
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
    console.log("state: ", this.state);
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form role="form">
            <div className="box-body" ref={abc => { this.abc = abc; console.log('---TuyenTN---', abc); }}>
              {this.props.show ? this.props.modaldata.map((item, index) => {
                let action = this.props.action;
                let val = action === "edit" ? JSON.stringify(item.text) : "";
                //console.log(val);
                if (!item.title.includes('is')) {
                  return (
                    <div key={"index-" + item.title} className="form-group">
                      <label htmlFor={item.title}>{item.title}</label>
                      <input type="text" className="form-control" onChange={e => this.props.change(e, index)} id={item.title} name={item.title} placeholder={"Enter " + item.title} value={val} />
                    </div>
                  )
                } else {
                  return (
                    <div className="checkbox" key={"index-" + item.title}>
                      <label>
                        <input type="checkbox" id={item.title} name={item.title} defaultChecked={val} />{item.title}
                      </label>
                    </div>
                  )
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