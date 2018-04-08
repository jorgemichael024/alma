import React, { Component } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import justGet from 'just-safe-get';
import justIsEmpty from 'just-is-empty';


const LoginContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #0B2027;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    padding-bottom: 50px;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border: 1px solid #EBEBEB;
    border-radius: 3px;
    width: 30%;
    height: 300px;
    margin-top: 5%;
    padding: 20px;
`;

const LoginTitle = styled.h1`
    margin: 0;
    font-size: 20px;
    color: #70A9A1;
    padding: 10px;
    text-align: center;
`;

const Input = styled.input`
    font-size: 18px;
    padding: 20px;
    color: #70A9A1;
    border-radius: 3px;
    border: 1px solid #70A9A1;
`;

const Button = styled.button`
    background-color: #40798C;
    color: #F6F1D1;
    padding: 20px;
    font-size: 18px;
`;


class Login extends Component {

    state = {
        username: '',
        password: ''
    }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state); 
    const { username, password } = this.state;

    axios.post('http://localhost:4000/user/signin', {
        username,
        password
    })
    .then(function (response) {
        console.log(response);
        const token = justGet(response, 'data.token');

        if (!justIsEmpty(token)) {
            localStorage.setItem('token', token);
            window.location.href = '/';
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render() {

    return (
        <LoginContainer>
            <LoginForm onSubmit={(e) => e.preventDefault()}>
                <LoginTitle>LOGIN</LoginTitle>
                <Input
                    onChange = {(event) => this.setState({username:event.target.value})}
                    autoComplete="username"
                    placeholder="Username"
                    name="username"
                />
                <br/>
                <Input
                    type="password"
                    onChange = {(event) => this.setState({password:event.target.value})}
                    autoComplete="password"
                    placeholder="Password"
                    name="password"
                />
                <br/>
                <Button label="Submit" type="submit" onClick={(event) => this.onSubmit(event)}>
                    SUBMIT
                </Button>
            </LoginForm>
        </LoginContainer>
    );
  }
}

export default Login;
