import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export class LargeModal extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps)
    }
    render() {
        return (
        <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    ahihihi
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}
