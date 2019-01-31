import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class RegisterSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
          <div>
            <h1>You have been registered successfully</h1>
            <Button onClick={this.handleClick} color='primary'><Link to="/" style={{ color: 'Primary', textDecoration: 'none' }}>Back LogIn</Link></Button>
            </div>
        );
    }
}



export default withRouter(RegisterSuccess);
