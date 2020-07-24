import React, {useEffect, useContext, useState} from 'react';
import {useRouter} from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {css} from '@emotion/core';
import styled from '@emotion/styled';

import Layout from '../../components/layout/Layout';
import {FirebaseContext} from '../../firebase';
import Error404 from '../../components/layout/404';
import { Div, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';


const ProductContainer = styled.div`
    @media(min-width: 760px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;
const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Product = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const [isGetData,setIsGetData] = useState(false);
    //Routing para obtener el id actual
    const router = useRouter();
    const { query: {id}} = router;

    //context de firebase
    const {firebase, user} = useContext(FirebaseContext);
    useEffect(() => {
        if(id && !isGetData){
            const getProduct = async () => {
                const queryProduct = await firebase.db.collection('products').doc(id);
                const product =await queryProduct.get();
                console.log(queryProduct,'adsf');

                if(product.exists){
                    setProduct(product.data());
                    console.log('aceptada');
                }else{
                    setError(true);
                    console.log('no aceptada');
                }
                setIsGetData(true);
            }
            getProduct();
        }
    }, [id]);
    if(Object.keys(product).length === 0 && !error) return 'Cargando...';

    const {comments, create, description, company, name, url, imageUrl, votes, creator, usersVote} = product;

    const voteProduct = () => {
        if(!user) return router.push('/login');
        const tmp = votes+1;
        // si ha votad
        if(usersVote.includes(user.uid)) return;
        const tmp2 = [...usersVote, user.uid];

        firebase.db.collection('products').doc(id).update({votes: tmp, usersVote: tmp2});

        setProduct({
            ...product,
            votes: tmp,
            usersVote: tmp2
        })
    }

    // comments
    const commentChange= e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const isCreator = id =>{
        return creator.id == id ? true:false;
    }

    const addComment = e => {
        e.preventDefault();
        if(!user){
            return router.push('/login');
        }

        comment.userId = user.uid;
        comment.userName = user.displayName;
        const tmp = [...comments, comment];

        firebase.db.collection('products').doc(id).update({
            comments: tmp
        })
        setProduct({
            ...product,
            comments: tmp
        })


    }

    const deleteProduct = async() => {
        if(!user)
            return router.push('/l9gin');
        if(creator.id !== user.uid)
            return router.push('/');
        try {
            await firebase.db.collection('products').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <>
                {error ? <Error404 /> :(
                        <div className="contenedor">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{name}</h1>
                        <ProductContainer>
                            <div>
                                <p>Published: {formatDistanceToNow(new Date(create))}</p>
                                <p>By: {creator.name} from: {company}</p>
                                <img src={imageUrl}/>
                                <p>{description}</p>
                                {user && (
                                    <>
                                        <h2>Add a Comment</h2>
                                        <form
                                            onSubmit={addComment}
                                        >
                                            <Div>
                                                <div>
                                                    <input 
                                                        type="text"    
                                                        name="message"
                                                        onChange={commentChange}
                                                    />
                                                </div>
                                            </Div>
                                            <InputSubmit type="submit" value="add a Comment"/>
                                        </form>
                                    </>
                                )}

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comments</h2>
                                {comments.length ===0 ? "Aun no hay comentarios": (
                                    <ul>
                                        {comments.map((comment,i) => (
                                            <li 
                                                key={`${comment.userId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comment.message}</p>
                                                <p>Written by: 
                                                    <span css={css`
                                                        font-weight: bold;
                                                    `}>
                                                    {''} {comment.userName}
                                                    </span>
                                                </p>
                                                {isCreator(comment.userId) && <ProductCreator>is Creator</ProductCreator>}
                                            </li>
                                        ))}
                                    </ul>

                                )}
                            </div>
                            <aside>
                                <Button target="_blank" bgColor="true" href={url}>Visite URL</Button>

                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p css={css`
                                        text-align: center;
                                    `}
                                    >{votes} Votes</p>
                                    {user && (
                                        <Button
                                            onClick={voteProduct}
                                        >Vote</Button>
                                    )}
                                </div>
                            </aside>
                        </ProductContainer>
                        {(user && isCreator && <Button onClick={deleteProduct}>Delete Product</Button>)}


                    </div>
                )}
            </>
        </Layout>
    );
}
 
export default Product;