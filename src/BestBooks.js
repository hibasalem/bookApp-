import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';



class BestBooks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showBooks: false,
            booksData: [],

        }
    }

    componentDidMount = async () => {

        const { user } = this.props.auth0;
        let serverRoute = process.env.REACT_APP_SERVER;
        const booksUrl = `${serverRoute}/books?email=${user.email}`;

        let result = await axios.get(booksUrl);

        this.setState({
            booksData: result.data
        })

        console.log(this.state.booksData);

    }


    render() {


        const carouselStyle = {
            marginLeft: "33%",
            marginRight: "25%",
            marginTop: "15px",
            width: "30rem"
        };


        return (

            <>
                < Carousel style={carouselStyle} fade>

                    {this.state.booksData.length && this.state.booksData.map(item => {

                        return (
                            <Carousel.Item>
                                <img

                                    className="d-block w-100"
                                    src={item.imageUrl}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{item.name}</h3>
                                    <p>{item.discription}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                    }

                </Carousel>

            </>
        )
    }
}
export default withAuth0(BestBooks);
