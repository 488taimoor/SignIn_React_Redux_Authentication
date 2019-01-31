import React, { Component } from "react";

import { Typography, Grid, TextField, Button, Hidden } from '@material-ui/core';
import validator from 'validator';
import { Link  } from 'react-router-dom';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            ErrorMsguser: false,
            ErrorMsgPas: false,
            ErrorMsgEmail: false,
            UserHelperText: '',
            emailFlag: false,
            userFlag: false,
            passwordFlag: false,
            PassHelperText: '',
            UserNameHelperText:''
        };
        this.handlEmail = this.handlEmail.bind(this);
        this.handlPassword = this.handlPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlename = this.handlename.bind(this);
    }

    handlename(event){
        if (!validator.isEmpty(event.target.value)) {
            this.setState({
                userFlag: false,
                UserNameHelperText:'',
                ErrorMsguser: false
            })
        } else {
            this.setState({
                userFlag: true,
                UserNameHelperText:'Please enter your name',
                ErrorMsguser: true
            })
        }

        this.setState({ username: event.target.value });
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
                PassHelperText: 'enter your password',
                ErrorMsgPas: true
            })
        }

        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        this.props.handleRegister(this.state.username, this.state.email, this.state.password)
    }


    render() {
        var errorMessage = (this.props.status != undefined && this.props.status == "REGISTER_EXISTING") ? "This email already exists" : ""

        return (

            <Grid container alignItems='center' justify='center' style={{ height: '87vh' }}>
                <Grid item lg={6} sm={10} xs={10}>
                    <Grid contianer alignItems='center'>
                        <Grid item lg={12} sm={12} xs={12}>
                            <div style={{ paddingBottom: '50px' }}>
                                <Hidden only={['md', 'lg', 'xl']}>
                                    <Typography variant='display1' color='primary' align='center'>FlashLogix Registration</Typography>
                                </Hidden>
                                <Hidden only={['sm', 'xs']}>
                                    <Typography variant='display2' color='primary' align='center'>FlashLogix Registration</Typography>
                                </Hidden>
                            </div>
                        </Grid>
                        <Grid item lg={12} sm={12} xs={12}>
                            <div style={{ paddingBottom: '0' }}><Typography variant='subheading'>Please enter the following details</Typography></div>
                        </Grid>

                         <Grid item lg={12} sm={12} xs={12}>
                            <div><TextField fullWidth
                                error={this.state.ErrorMsguser}
                                placeholder="User Name"
                                value={this.state.username}
                                onChange={this.handlename}
                                helperText={this.state.UserNameHelperText}
                                label="User Name" margin="normal"

                            />
                            </div>
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
                            <Grid container spacing={16} justify='center' alignItems='center' direction='column'>
                                <Grid item lg={12} >
                                    <Button onClick={this.props.handleCancel} color='primary'><Link to="/" style={{color:'primary',textDecoration:'none'}}>Cancel</Link></Button>
                                    <Button type='submit' variant='raised' color='primary' onClick={this.handleSubmit}
                                        disabled={((this.state.username === ''||this.state.email === '' || this.state.password === '') || (this.state.userFlag === ''||this.state.emailFlag || this.state.passwordFlag)) ? true : false}
                                    >Create</Button>
                                </Grid>
                            </Grid>
                        </Grid>


                        
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}

export default Register
