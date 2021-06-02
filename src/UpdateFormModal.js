import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class UpdateFormModal extends React.Component {
    render() {
        return (
            <>
                <Modal show={this.props.showUpdateFormValue} >

                    <Modal.Header closeButton onClick={this.props.handleCloseUpdate} >
                        <Modal.Title>Update books data</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form onSubmit={(e) => this.props.updateBooks(e)}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Edit Book Name </Form.Label>
                                <Form.Control type="text" onChange={(e) => this.props.updateBookNameEdit(e)} value={this.props.bookName}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label> Edit Book discription </Form.Label>
                                <Form.Control type="text"  onChange={(e) => this.props.updateBookDiscriptionEdit(e)} value={this.props.bookDiscription}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Edit Book image Url</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.props.updateBookImageUrlEdit(e)} value={this.props.bookImageUrl} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                             </Button>
                            <Button variant="secondary" onClick={this.props.handleCloseUpdate}>
                                Close
                             </Button>

                        </Form>

                    </Modal.Body>

                </Modal>
            </>
        )
    }
}
export default withAuth0(UpdateFormModal);