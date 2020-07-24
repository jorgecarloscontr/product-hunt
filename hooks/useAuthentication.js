import React, {useEffect, useState} from 'react';
import firebase from '../firebase';

function useAuthentication(){
    const [ authUser, setAuthUser ] = useState(null);

    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            if(user){
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }
        })
    }, []);
    /*useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if(user){
                setAuthUser(user);
            }else{
                setAuthUser(null);
            }
        })
        return () => unsuscribe();
    }, []);*/

    return authUser;
}

export default useAuthentication;