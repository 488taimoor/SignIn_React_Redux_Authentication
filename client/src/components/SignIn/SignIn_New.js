import React from 'react';

import { Typography, Grid, TextField, Button, Hidden } from '@material-ui/core';
import validator from 'validator';
import { Link } from 'react-router-dom';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            ErrorMsgPas: false,
            ErrorMsgEmail: false,
            UserHelperText: '',
            emailFlag: false,
            passwordFlag: false,
            PassHelperText: ''
        };
        this.handlEmail = this.handlEmail.bind(this);
        this.handlPassword = this.handlPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handlEmail(event) {
        ((validator.isEmail(event.target.value) || (event.target.value === '')) ?
            this.setState({
                emailFlag: false,
                UserHelperText: '',
                ErrorMsgEmail: false
            })
            :
            this.setState({
                emailFlag: true,
                UserHelperText: 'Please enter valid email',
                ErrorMsgEmail: true
            })
        )

        this.setState({ email: event.target.value });
    }
    handlPassword(event) {
        if (!validator.isEmpty(event.target.value)) {
            this.setState({
                passwordFlag: false,
                PassHelperText: '',
                ErrorMsgPas: false
            })
        } else {
            this.setState({
                passwordFlag: true,
                PassHelperText: 'Enter your password',
                ErrorMsgPas: true
            })
        }

        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSignIn(this.state.email, this.state.password)

    }

    render() {
        //incase wrong Email or password
        var errorMessage = (this.props.status != undefined && this.props.status == "LOGIN_ACCOUNT_NOT_AUTHORIZED") ? "Email or password is incorrect" : ""
        
        return (

            <Grid container alignItems='center' justify='center' style={{ height: '87vh' }}>
                <Grid item lg={6} sm={10} xs={10}>
                    <Grid contianer alignItems='center'>
                        <Grid item lg={12} sm={12} xs={12}>
                            <div style={{ paddingBottom: '50px' }}>
                                <Hidden only={['md', 'lg', 'xl']}>
                                    <Typography variant='display1' color='primary' align='center'>FlashLogix Account</Typography>
                                </Hidden>
                                <Hidden only={['sm', 'xs']}>
                                    <Typography variant='display2' color='primary' align='center'>FlashLogix Account</Typography>
                                </Hidden>
                            </div>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <div style={{ paddingBottom: '0' }}><Typography variant='subheading'>Please enter the following details</Typography></div>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <div><TextField fullWidth
                                error={this.state.ErrorMsgEmail}
                                placeholder="User Email"
                                value={this.state.email}
                                onChange={this.handlEmail}
                                helperText={this.state.UserHelperText}
                                label="User Email" margin="normal"

                            />
                            </div>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <div><TextField fullWidth
                                error={this.state.ErrorMsgPas}
                                placeholder="Enter Pin"
                                type="password"
                                onChange={this.handlPassword}
                                value={this.state.password}
                                helperText={this.state.PassHelperText}
                                label="Password"
                                margin="normal" /></div>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <div style={{ paddingBottom: '0' }}><Typography variant='subheading' style={{color:'red'}}>{errorMessage}</Typography></div>
                        </Grid>

                        <Grid item lg={12} sm={12} xs={12} style={{ paddingTop: '50px' }}>
                            <Grid container spacing={8} justify='center' alignItems='center' direction='column'>
                                <Grid item lg={12} >
                                    <Button type='submit' variant='raised' color='primary' onClick={this.handleSubmit}
                                        disabled={((this.state.email === '' || this.state.password === '') || (this.state.emailFlag || this.state.passwordFlag)) ? true : false}
                                    >ACCESS</Button>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid item lg={12} sm={12} xs={12} style={{ paddingTop: '60px' }}>
                            <Grid container spacing={8} justify='center' alignItems='center' direction='column'>
                                <Grid item lg={12} >
                                    <Typography variant='subheading' color='primary' align='center'>Create a new Account?</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={12} sm={12} xs={12} style={{ paddingTop: '10px' }}>
                            <Grid container spacing={8} justify='center' alignItems='center' direction='column'>
                                <Grid item lg={12} >
                                    <Button type='submit' variant='raised' color='primary'>
                                        <Link to="/Register" style={{ color: 'white', textDecoration: 'none' }}>Create New Account</Link>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}

export default LoginForm
