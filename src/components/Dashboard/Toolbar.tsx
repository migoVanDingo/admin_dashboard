import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router"
import FileTree from "./FileTree"

const SToolbar = styled.div`
  background: #191449;

  display: flex;
  flex-direction: column;
  color: #d2d2d2;
  padding: 15px 20px;

  align-items: center;
  gap: 20px;

  font-size: 1rem;

  grid-column: 1 / 2;
  grid-row: 1 / 3;
`
const SHomeLink = styled.a`
  text-decoration: none;
  width: 100%;
  border-bottom: 0.5px solid #d2d2d2;
  padding: 10px;
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
  padding-left: 0;
`
const SListItem = styled.li`
  list-style-type: none;
  width: 100%;
`

const SListLink = styled.a`

  color:#d2d2d2;
  text-decoration: none;
  &:hover{
    color: #00ffbf;
    cursor: pointer;
  }
`

const SToolHeadingMed = styled.h3`
  font-size: 1.3rem;
  color: #00ffbf;
  text-align: center;
`
const SToolHeadingSm = styled.h4`
  font-size: 1rem;
  justify-self: flex-start;
  width: 100%;

  font-weight: 400;
  margin: 0;
  padding: 0;
`

const SHeadingTiny = styled.p`
  font-size: 0.6rem;
  color: #d2d2d2;
  font-weight: 600;
  width: 100%;
  text-align: left;

  margin: 0;
  padding: 0;
`

const SDashLogout = styled.a`
  color: #8bbbff;
  width: 150px;
  text-decoration: none;
  border: 2px solid #8bbbff;
  text-align: center;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  position: absolute;
  bottom: 100px;

  &:hover {
    color: #00ffbf;
    border-color: #00ffbf;
  }

  &:active {
    color: #3ee98b;
    border-color: #3ee98b;
  }
`

interface IToolbar {
  handleCreateFolder: () => any
  folderId: string
}

export default function Toolbar({
  allFolders,
  rootId,
  setCurrentFolderId,
  folderId,
}: any) {
  const navigate = useNavigate()
  const { logout, currentUser } = useAuth()

  function handleLogout() {
    navigate("/login")
    logout()
  }

  return (
    <SToolbar>
      <SHomeLink href={"/folder/" + currentUser.uid}>
        <SToolHeadingMed>AOLME</SToolHeadingMed>
      </SHomeLink>
      <SHeadingTiny>Navigation Shortcuts</SHeadingTiny>
      <SToolbarList>
        <SListItem><SListLink>Dashboard</SListLink></SListItem>
        <SListItem><SListLink>Repository</SListLink></SListItem>
        <SListItem><SListLink target="_blank" rel="noopener" href="http://localhost:8080/user/login/">Labeler</SListLink></SListItem>
      </SToolbarList>
      <SToolHeadingSm>Folders</SToolHeadingSm>
      <FileTree
        folderId={folderId}
        rootId={rootId}
        allFolders={allFolders}
        setCurrentFolderId={setCurrentFolderId}
      />
      {/* <SToolHeadingSm>Exports</SToolHeadingSm> */}
      <SDashLogout onMouseUp={handleLogout}>Logout</SDashLogout>
    </SToolbar>
  )
}
