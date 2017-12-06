import React from 'react';
import $ from 'jquery';

import 'datatables.net-bs/js/dataTables.bootstrap.js';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
// import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-responsive';
// import 'datatables.net-editor';
// import 'datatables.altEditor.free/js/altEditor/dataTables.altEditor.free.js';
// import {LargeModal} from './Modal';
import {Modal, Button, ButtonToolbar} from 'react-bootstrap';

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
      showError: '',
      response: {},
    }

    this.edit = this.edit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    console.log("Props recieved: ", nextProps.data);
    let changed = this.state.data !== nextProps.data;
    changed? this.renderTable(nextProps.data): null;
  }

  componentWillUnMount() {
    $(this.refs.dataTable).DataTable().destroy(true);
  }
  renderTable(data) {
    console.log("table rendered");
    let tableTemplate = this.refs.dataTable;
    if (data.length === 0){
      $(tableTemplate).DataTable({
        data: [],
        columns: [
          {title: 'ID'},
          {title: 'Name'}
        ]
      });
    } else {
      let dataRows = data.map(obj => {
        let keys = Object.keys(obj);
        return keys.reduce((arr, attr) => arr.concat(obj[attr]), []);
      });
      let columns = Object.keys(data[0]).map(key => ({title: key}));
      
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
    

    submit = () => {
        this.setState({ showError: '' });
        let re = /^\w+$/;
        if(this.state.username === '') {
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
        else if(this.state.password === '') {
            this.setState({ error: 'Password cannot blank' });
        }
        else if (this.state.password !== this.state.repassword) {
            this.setState({ error: 'Please check that you\'ve entered and confirmed your password!' });
        }
        else if(this.state.password === this.state.repassword) {
            if(this.state.password.length < 4) {
              this.setState({ error: 'Password must contain at least six characters!', password: '' });
            }
            if(this.state.password === this.state.username) {
              this.setState({ error: 'Password must be different from Username!' });
            }
            re = /[0-9]/;
            if(!re.test(this.state.password)) {
              this.setState({ error: 'password must contain at least one number (0-9)!' });
            }
            re = /[a-z]/;
            if(!re.test(this.state.password)) {
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
                .then( (response) => { 
                   this.setState({ response: response});
                });
            }
        }
    };
  edit(e) {
    e.preventDefault();
    let table = this.refs.dataTable;
    let rowInfo = [];
    let columns = [];
    $(table).find('th').each(function() {
      columns.push($(this).text());
    });
    $(table).find('.selected').find('td').each(function() {
      rowInfo.push($(this).text());
    });

    console.log("selected: ", rowInfo, columns );
    if (rowInfo.length !== 0) {
      this.setState({ modalAction: "edit", modalShow: true, modalData: {data: rowInfo, columns: columns} });
    }
  }
  render () {
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
                  <Button className="delete_btn">Delete</Button>
                  <LargeModal action={this.state.modalAction} show={this.state.modalShow} changeDadState={(e) => this.setState({ [e.target.name]: e.target.value })} modaldata={this.state.modalData} onHide={() => this.setState({modalShow: false})}/>
                </ButtonToolbar>
                <hr />
                <table id="example1" className="dataTable table table-bordered table-striped" ref="dataTable">
                  
                </table>
              </div>
              {this.state.tableName==="Customers"?(
              <div className="create_form" style={{ display: this.state.createPageShow }}>
                <form className="form-horizontal" >
                        <h4> Thông tin tài khoản </h4>
                        <div className="control-group">
                            <label className="control-label" htmlFor="input_username">Tên đăng nhập <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="input_username" autoComplete="false" name="username" onChange={this.change} value={this.state.username} placeholder="Username" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="inputPassword1">Mật khẩu <sup>*</sup></label>
                            <div className="controls">
                                <input type="password" id="inputPassword1" name="password" onChange={this.change} value={this.state.password} placeholder="Password" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="inputPassword2">Nhập lại mật khẩu <sup>*</sup></label>
                            <div className="controls">
                                <input type="password" id="inputPassword2" name="repassword" onChange={this.change} value={this.state.repassword} placeholder="Retype Password" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="email">Email <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="email" autoComplete="false" name="email" onChange={this.change} value={this.state.email} placeholder="Email" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="firstName">Họ <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="firstName" name="firstName" onChange={this.change} value={this.state.firstName} placeholder="Ho" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="lastName">Tên <sup>*</sup></label>
                            <div className="controls">
                                <input type="text" id="lastName" name="lastName" onChange={this.change} value={this.state.lastName} placeholder="Ten" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="gender">Giới tính</label>
                            <div className="controls">
                                <input type="radio" id="nam" name="gender" checked={this.state.gender === "nam"} onChange={this.change} value="nam" /><label htmlFor="nam" style={{ display: 'inline' }}>Nam</label>
                                <input type="radio" id="nu" name="gender" checked={this.state.gender === "nu"} onChange={this.change} value="nu" /><label htmlFor="nu" style={{ display: 'inline' }}>Nữ</label>
                                <input type="radio" id="khac" name="gender" checked={this.state.gender === "khac"} onChange={this.change} value="khac" /><label htmlFor="khac" style={{ display: 'inline' }}>Khác</label>
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="telephone">Số điện thoại</label>
                            <div className="controls">
                                <input type="text" id="telephone" name="telephone" onChange={this.change} value={this.state.telephone} placeholder="+84" />
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="address">Địa chỉ</label>
                            <div className="controls">
                                <input type="text" id="address" name="address" onChange={this.change} value={this.state.address} placeholder="Dia chi" />
                            </div>
                        </div>

                        <div className={ "alert alert-block alert-error fade in"+this.state.showError }>
                            <button type="button" className="close" onClick={this.closeError} data-dismiss="alert">×</button>
                            <strong>{this.state.error}</strong>
                        </div>

                        <p><sup>*</sup>Bắt buộc </p>
                    </form>
                    <div className="control-group">
                        <div className="controls">
                            <button className="btn btn-large btn-success" onClick={this.submit}>Đăng kí</button>
                        </div>
                    </div>
              </div>
              ): (
                  <div className="create_form" style={{ display: this.state.createPageShow }}>
                    <form className="form-horizontal" >
                      <h4> Thông tin sản phẩm </h4>
                    </form>
                    <div className="control-group">
                      <div className="controls">
                        <button className="btn btn-large btn-success" onClick={this.submit}>Thêm sản phẩm</button>
                      </div>
                    </div>
                  </div>
              )}
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
      response: {},
      modaldata: '',
    }
  }
  // componentWillReceiveProps(nextProps){
  //   this.setState({
  //     username: nextProps.userName,
  //     password: nextProps.password,
  //     repassword: nextProps.repassword,
  //     firstName: nextProps.firstName,
  //     lastName: nextProps.lastName,
  //     gender: 'khac',
  //     dob: nextProps.dob,
  //     email: nextProps.email,
  //     telephone: nextProps.telephone,
  //     address: nextProps.address,
  //     error: nextProps.error,
  //     showError: nextProps.showError,
  //     response: {},
  //     show: true,
  //     modaldata: nextProps.modaldata,
  //   });
  //   console.log("nextProps: ", nextProps);
  //   console.log("state: ", this.state);
    
  // }

  /**
   * @param {Event} e
   */
  change(e) {
    this.set;
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
              {this.props.show?this.props.modaldata.columns.map((column, index) => {
                let action = this.props.action;
                let val = action==="edit"?this.props.modaldata.data[index]:"";
                console.log(val);
                if(!column.includes('is')){
                  return (
                  <div key={"index-" + column} className="form-group">
                    <label htmlFor={column}>{column}</label>
                    <input type="text" className="form-control" id={column} name={column} placeholder={"Enter " + column} defaultValue={val}/>
                  </div>
                  )
                } else {
                  return (
                  <div className="checkbox" key={"index-" + column}>
                    <label>
                      <input type="checkbox" id={column} name={column} defaultChecked={val}/>{column}
                    </label>
                  </div>
                  )
                }}):null}
            </div>

            <div className="box-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
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