
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends React.Component{
    render(){
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <>
            {isAuthenticated&&<>
            <img src={user.picture} alt =''></img>
            <h3>Hello {user.name}!</h3>
            <h3>Email :{user.email}</h3>
            </>}
            </>
        )
    }
}

export default withAuth0(Profile);