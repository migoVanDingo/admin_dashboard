import React, { useRef } from 'react'
import styled from "styled-components"

const SCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    background: #f6f6f6;
    padding: 1.5rem 3rem 3rem;
    border-radius: 8px;
    margin-top: 80px;
    box-shadow: 2px 2px 2px #dedede;
    `

const SSubmitButton = styled.button`
    width: 100%;
    height: 3rem;
    background-color: green;
    color: white;
    border-radius: 6px;
    margin: 10px;
    margin-top: 30px;
    font-family: inherit;
`

const STextInputLabel = styled.label`
    align-self: flex-start;
    font-size: 0.8rem;
   margin: 10px 0px 5px;
`

const STextInput = styled.input`
    width: 100%;
    height: 2rem;
    border-radius: 4px;
    border: 1px solid #bebebe;

`

const SSmallLink = styled.a`
    font-size: 0.7rem;
    margin-top: 20px;
    color: blue;
`

export default function ForgotPassword() {
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;;



  return (
    <SCard>
        <h3>Reset Password</h3>
        <STextInputLabel>Enter account email</STextInputLabel>
        <STextInput type="email" ref={emailRef}/>



        <SSubmitButton >Reset Password</SSubmitButton>  
        <SSmallLink>Back to Login</SSmallLink>
        <SSmallLink>Don't have an account? Sign up</SSmallLink>
    </SCard>
  )
}
