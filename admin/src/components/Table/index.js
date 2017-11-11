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
import {Modal, Button, ButtonGroup} from 'react-bootstrap';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      tableName: props.tableName,
      modalShow: false
    }

    this.edit = this.edit.bind(this);
  }

  edit(e) {
    e.preventDefault();
    console.log("hihi");;
  }

  shouldComponentUpdate(nextState){
    return this.state.data !== nextState.data;
  }
  componentWillReceiveProps(nextProps) {
    console.log("Props recieved: ", nextProps.data);
    this.setState({ data: nextProps.data });
  }
  renderTable(data) {
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

  render () {
    this.renderTable(this.state.data);
    return (
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">{this.state.tableName}</h3>
              </div>
              <div className="box-body">
              <ButtonGroup>
                <Button className="create_btn">New</Button>
                <Button className="edit_btn" onClick={() => this.setState({modalShow: true})}>Edit</Button>
                <Button className="delete_btn">Delete</Button>
              </ButtonGroup>
              <LargeModal onHide={() => this.setState({modalShow: false})} show={this.state.modalShow} />
                <table id="example1" className="dataTable table table-bordered table-striped" ref="dataTable">
                  
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    )
  }
}
class LargeModal extends React.Component {
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default DataTable;