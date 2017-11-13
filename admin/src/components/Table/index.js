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
      modalData: {}
    }

    this.edit = this.edit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    console.log("Props recieved: ", nextProps.data);
    let changed = this.state.data !== nextProps.data;
    changed?this.setState({ changed: true, data: nextProps.data }):null;
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
    if (this.state.changed) {
      
      this.renderTable(this.state.data);
      this.setState({changed: false});
    } 
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
                  <Button className="create_btn">New</Button>
                  <a className="btn btn-primary" onClick={this.edit}>
                    Edit
                  </a>
                  <Button className="delete_btn">Delete</Button>
                  <LargeModal action={this.state.modalAction} show={this.state.modalShow} modaldata={this.state.modalData} onHide={() => this.setState({modalShow: false})}/>
                </ButtonToolbar>
                <hr />
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
    console.log("state: ", this.props);
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form role="form">
            <div className="box-body">
              {this.props.show?this.props.modaldata.columns.map((column, index) => {
                let action = this.props.action;
                let val = action==="edit"?this.props.modaldata.data[index]:"";
                console.log(val);
                if(!column.includes('is')){
                  return (
                  <div key={"index-" + column} className="form-group">
                    <label htmlFor={column}>{column}</label>
                    <input type="text" className="form-control" id={column} name={column} placeholder={"Enter " + column} value={val}/>
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