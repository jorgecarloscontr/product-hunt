import React, { useState, useEffect } from 'react';

const useValidation = (stateInitial, validate, fn) => {
    const [values, setValues] = useState(stateInitial);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm){
            const noErrors = Object.keys(errors).length === 0;
            if(noErrors) {
                fn();
            }
            setSubmitForm(false);
        }
    }, [errors]);

    // function that runs when the user types something
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    // Function that run when the user submits
    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    }

    const handleBlur = () => {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur
    };
}
 
export default useValidation;