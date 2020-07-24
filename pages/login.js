import React, {useState} from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { css } from '@emotion/core';
import { Form, Div, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';
// validations
import useValidation from '../hooks/useValidation';
import validationLogin from '../validation/validationLogin';

const INITIAL_STATE = {
  email: '',
  password: ''
}

export default function Login() {
  const [error, setError] = useState(false);

  const {values, errors, handleChange,  handleSubmit, handleBlur} = useValidation(INITIAL_STATE,validationLogin, login);

  const {email, password} = values;
  
  async function login(){
    try {
      await firebase.login(email, password);

      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario', error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css = {css`
              text-align: center;
              margin-top: 5rem;
            `}
          >User Login</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Div>
              <label htmlFor="email">Email</label>
              <div>
                <input type="email" id="email" placeholder="Your Email" name="email" value={email} onChange={handleChange} onBlur={handleBlur}/>
                {errors.email && <Error>* {errors.email}</Error>}
              </div>
            </Div>
            <Div>
              <label htmlFor="password">Password</label>
              <div>
                <input type="password" id="password" placeholder="Your Password" name="password" value={password} onChange={handleChange} onBlur={handleBlur}/>
                {errors.password && <Error>* {errors.password}</Error>}
              </div>
            </Div>
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Login"/>
          </Form>
        </>
      </Layout>
    </div>
  )
}
