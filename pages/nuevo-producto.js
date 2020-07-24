import React, {useState, useContext} from 'react';
import Layout from '../components/layout/Layout';
import Router, {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { css } from '@emotion/core';
import { Form, Div, InputSubmit, Error } from '../components/ui/Form';

import { FirebaseContext } from '../firebase';
import Error404 from '../components/layout/404';

// validations
import useValidation from '../hooks/useValidation';
import validationCreateProduct from '../validation/validationCreateProduct';

const INITIAL_STATE = {
  name: '',
  company: '',
  image: '',
  url: '',
  description: '',
}

export default function NuevoProducto() {
  //state images
  const [imgeName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState(false);

  const {values, errors, handleChange,  handleSubmit, handleBlur} = useValidation(INITIAL_STATE,validationCreateProduct, createProduct);

  const {name, company, image, url, description} = values;
  //hook de routing para redireccionar
  const router = useRouter();
  //context
  const {user, firebase} = useContext(FirebaseContext);
  
  async function createProduct(){
    if(!user){
      return router.push('/login');
    }

    const product = {
      name,
      company,
      url,
      imageUrl,
      description,
      votes: 0,
      comments: [],
      create: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName
      },
      usersVote: []
    }

    //insert to db
    firebase.db.collection('products').add(product);

    return router.push('/');
  }

  // function ract-firebase-file
  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  }

  const handleProgress = progress => setProgress({progress});

  const handleUploadError = error => {
    setUploading(error);
    console.log(error);
  }

  const handleUploadSuccess = filename => {
    setImageName(filename);
    setProgress(100);
    setUploading(false);

    firebase
      .storage
      .ref("products")
      .child(filename)
      .getDownloadURL()
      .then(url => setImageUrl( url ));
  };

  return (
    <div>
      <Layout>
        {!user? <Error404 /> : (
          <>
            <h1
              css = {css`
                text-align: center;
                margin-top: 5rem;
              `}
            >New Product</h1>
            <Form onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>General Information</legend>
                <Div>
                  <label htmlFor="nombre">Name</label>  
                  <div>
                    <input type="text" id="nombre" placeholder="Product Name" name="name" value={name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && <Error>* {errors.name}</Error>}
                  </div>
                </Div>
                <Div>
                  <label htmlFor="company">Company</label>  
                  <div>
                    <input type="text" id="company" placeholder="Company Name" name="company" value={company} onChange={handleChange} onBlur={handleBlur} />
                    {errors.company && <Error>* {errors.company}</Error>}
                  </div>
                </Div>
                <Div>
                  <label htmlFor="image">Image</label>  
                  <div>
                    <FileUploader 
                      accept="image/*"
                      id="image"  
                      name="image" 
                      randomizeFilename
                      storageRef= {firebase.storage.ref("products")}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                    />
                  </div>
                </Div>
                <Div>
                  <label htmlFor="url">URL</label>  
                  <div>
                    <input type="url" id="url"  name="url" value={url} placeholder="Company URL" onChange={handleChange} onBlur={handleBlur} />
                    {errors.url && <Error>* {errors.url}</Error>}
                  </div>
                </Div>
              </fieldset>

              <fieldset>
                <legend>About your Product</legend>
                <Div>
                  <label htmlFor="description">Description</label>  
                  <div>
                    <textarea id="description"  name="description" value={description} onChange={handleChange} onBlur={handleBlur} />
                    {errors.description && <Error>* {errors.description}</Error>}
                  </div>
                </Div>
              </fieldset>

              {error && <Error>{error}</Error>}
              <InputSubmit type="submit" value="Crear Producto"/>
            </Form>
          </>
        )}
      </Layout>
    </div>
  )
}
