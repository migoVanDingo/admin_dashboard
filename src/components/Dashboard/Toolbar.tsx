import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router"

const SToolbar = styled.div`
  background: #191919;

  display: flex;
  flex-direction: column;
  color: #d2d2d2;
  padding: 35px 40px;

  align-items: center;
  gap: 20px;

  font-size: 0.8rem;

  grid-column: 1 / 2;
  grid-row: 1 / 3;
`
const SHomeLink = styled.a`
  text-decoration: none;
`

const SButton = styled.button`
  width: 100px;
  height: 100px;
  background-color: pink;
`

const SToolbarList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SToolHeadingMed = styled.h3`
  font-size: 1.3rem;
`
const SToolHeadingSm = styled.h4`
  font-size: 1rem;
  justify-self: flex-start;
  width: 100%;

  font-weight: 400;
`
const SDashLogout = styled.a`
  color: #006aff;
  width: 150px;
  text-decoration: none;
  border: 2px solid #006aff;
  text-align: center;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;

  &:hover{
    color:#60a2fe;
    border-color:#60a2fe;
  }

  &:active{
    color:#3ee98b;
    border-color:#3ee98b;
  }

`

interface IToolbar {
  handleCreateFolder: () => any
}

export default function Toolbar({}: any) {

  const navigate = useNavigate()
  const { logout, currentUser } = useAuth()

  function handleLogout() {
    navigate("/login")
    logout()
  }
  return (
    <SToolbar>
      <SHomeLink href={"/folder/"+currentUser.uid}><SToolHeadingMed >My Repo</SToolHeadingMed></SHomeLink>
      <SToolHeadingSm>Folders</SToolHeadingSm>
      <SToolbarList>
        <a>link 1</a>
        <a>link 2</a>
        <a>link 3</a>
        <a>link 4</a>
      </SToolbarList>
      <SDashLogout onMouseUp={handleLogout}>Logout</SDashLogout>
    </SToolbar>
  )
}
