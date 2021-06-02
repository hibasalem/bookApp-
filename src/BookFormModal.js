import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BookFormModal extends React.Component {
    render() {
        return (
            <>
                <Modal show={this.props.showvalue} >
                    <Modal.Header closeButton onClick={this.props.hideValue} >
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={(e) => this.props.addBooks(e)}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Name </Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Name" name="BookName" onChange={(e) => this.props.updateBookName(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book discription </Form.Label>
                                <Form.Control type="text" placeholder="Enter Book discription" name="BookDiscription" onChange={(e) => this.props.updateBookDiscription(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book image Url</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book image Url" name="BookImageUrl" onChange={(e) => this.props.updateBookImageUrl(e)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={this.props.hideValue}>
                                Submit
                             </Button>
                            <Button variant="secondary" onClick={this.props.hideValue}>
                                Close
                             </Button>

                        </Form>

                    </Modal.Body>

                </Modal>
            </>
        )
    }
}
export default withAuth0(BookFormModal);
