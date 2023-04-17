import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"

const SCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
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
    
export default function Login() {
  
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const pwRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)

    const { login } = useAuth()


    function handleLogin(){
        setLoading(true)
        console.log('handle login...')
        login(emailRef.current.value, pwRef.current.value)
        .then((result:any) => {
            result && console.log("Login successful")
            navigate("/dashboard")
        })
        .catch((err: any) => console.error(err))

        setLoading(false)
        
    }

  return (
    <SCard>
        <h3>Login</h3>
        <STextInputLabel>Email</STextInputLabel>
        <STextInput type="email" ref={emailRef}/>

        <STextInputLabel>Password</STextInputLabel>
        <STextInput type="password" ref={pwRef}/>


        <SSubmitButton disabled={loading} onClick={handleLogin}>Login</SSubmitButton>  
        <SSmallLink>Forgot password?</SSmallLink>
        <SSmallLink>Don't have an account? Sign up</SSmallLink>
    </SCard>
  )
}
