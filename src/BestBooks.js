import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button';
import UpdateFormModal from './UpdateFormModal';


class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            books: [],
            bookName: "",
            bookDiscription: "",
            bookImageUrl: "",
            server: process.env.REACT_APP_SERVER,
            // server: "https://canofbookshiba.herokuapp.com",
            booksData: [],
            showUpdateForm: false,
            index: 0,
        }
    }

    componentDidMount = async () => {

        const { user } = this.props.auth0;
        let serverRoute = process.env.REACT_APP_SERVER;
        const booksUrl = `${serverRoute}/books?email=${user.email}`;
        let result = await axios.get(booksUrl);
        this.setState({
            books: result.data
        })
        console.log(this.state.booksData);
    }

    addBooks = async (event) => {

        event.preventDefault();

        const bookFormData = {
            userEmail: this.props.auth0.user.email,
            bookName: this.state.bookName,
            bookDiscription: this.state.bookDiscription,
            bookImageUrl: this.state.bookImageUrl
        }

        const newBook = await axios.post(`${this.state.server}/addBooks`, bookFormData)
        this.setState({
            books: newBook.data,
        })
    }

    deleteBook = async (index) => {
        let { user } = this.props.auth0;
        user = { email: user.email }
        let newBookreq = await axios.delete(`${this.state.server}/deleteBook/${index}`, { params: user })

        this.setState({
            books: newBookreq.data
        })
    }



    updateBooks = async (event) => {
        event.preventDefault();

        const bookFormDatatoUpdate = {

            email: this.props.auth0.user.email,
            name: this.state.bookName,
            discription: this.state.bookDiscription,
            imageUrl: this.state.bookImageUrl

        }

        console.log("bookFormDatatoUpdate",bookFormDatatoUpdate)
        console.log("index" ,this.state.index)
        
        let booksdataUpdate = await axios.put(`${this.state.server}/updateBooks/${this.state.index}`, bookFormDatatoUpdate)
        console.log("booksdataUpdate" ,booksdataUpdate)

        this.setState({
            books: booksdataUpdate.data,
            showUpdateForm: false,
        })

    }

    showUpdate = (idx) => {

        console.log("show update")

        const bookToUpdate = this.state.books.filter((val, index) => {
            return idx === index;
        })

        console.log("before",bookToUpdate)


        this.setState({
            showUpdateForm: true,
            index: idx,
            bookName: bookToUpdate[0].name,
            bookDiscription: bookToUpdate[0].discription,
            bookImageUrl: bookToUpdate[0].imageUrl,
        
        })

        console.log("after",this.state.bookName)

    }



    updateBookName = (event) => {
        this.setState({
            bookName: event.target.value
        })
    }
    updateBookDiscription = (event) => {
        this.setState({
            bookDiscription: event.target.value
        })
    }
    updateBookImageUrl = (event) => {
        this.setState({
            bookImageUrl: event.target.value
        })
    }

    handleShow = () => {
        this.setState({
            show: true,
        })
    }
    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    handleCloseUpdate = () => {
        this.setState({
            showUpdateForm: false,
        })
    }


    render() {

        const carouselStyle = {
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "15px",
        };

        return (
            <>
                <Button variant="primary" onClick={this.handleShow} >
                    add book
                </Button>
                <BookFormModal
                    showvalue={this.state.show}
                    hideValue={this.handleClose}
                    updateBookName={this.updateBookName}
                    updateBookDiscription={this.updateBookDiscription}
                    updateBookImageUrl={this.updateBookImageUrl}
                    addBooks={this.addBooks}
                />
                <CardColumns style={carouselStyle}>
                    {this.state.books.length !== 0 &&

                        this.state.books.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img src={item.imageUrl} variant="top" style={{ width: '16rem', margin: 'auto' }} />

                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text style={{ overflow: 'auto', height: '5rem' }}>
                                                {item.discription}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => this.deleteBook(idx)}>Delete</Button>
                                            <Button variant="primary" onClick={() => this.showUpdate(idx)}>Update</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                </CardColumns>

                {this.state.showUpdateForm &&

                    <UpdateFormModal
                        showUpdateFormValue={this.state.showUpdateForm}
                        handleCloseUpdate={this.handleCloseUpdate}

                        updateBooks={this.updateBooks}

                        updateBookNameEdit={this.updateBookName}
                        updateBookDiscriptionEdit={this.updateBookDiscription}
                        updateBookImageUrlEdit={this.updateBookImageUrl}

                        bookName={this.state.bookName}
                        bookDiscription={this.state.bookDiscription}
                        bookImageUrl={this.state.bookImageUrl}
                    />
                }



            </>
        )
    }
}
export default withAuth0(BestBooks);
