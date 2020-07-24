import React, {useState} from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { css } from '@emotion/core';
import { Form, Div, InputSubmit, Error } from '../components/ui/Form';

import firebase from '../firebase';
// validations
import useValidation from '../hooks/useValidation';
import validationCreateAccount from '../validation/validationCreateAccount';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

export default function CrearCuenta() {
  const [error, setError] = useState(false);

  const {values, errors, handleChange,  handleSubmit, handleBlur} = useValidation(INITIAL_STATE,validationCreateAccount, createAccount);

  const {name, email, password} = values;
  
  async function createAccount(){
    try {
      await firebase.register(name, email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error);
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
          >Crear Cuenta</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Div>
              <label htmlFor="nombre">Nombre</label>  
              <div>
                <input type="text" id="nombre" placeholder="Your Name" name="name" value={name} onChange={handleChange} onBlur={handleBlur} />
                {errors.name && <Error>* {errors.name}</Error>}
              </div>
            </Div>
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
            <InputSubmit type="submit" value="Crear Cuenta"/>
          </Form>
        </>
      </Layout>
    </div>
  )
}
