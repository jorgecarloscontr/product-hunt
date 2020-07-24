import styled from '@emotion/styled';

export const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Div = styled.div`
    margin-bottom: 2rem;
    display: flex;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }
    div{
        flex: 1;
        padding: 0;        
        input {
            width: 100%;
            height: 3rem;
            padding: 1rem;
        }
        textarea {
            width: 100%;
            height: 400px;

        }

    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;

export const Error = styled.p`
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: red;
    margin: .5rem 0 0;
`;