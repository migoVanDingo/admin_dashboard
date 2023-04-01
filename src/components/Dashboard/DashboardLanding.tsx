import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faF, faFolder } from "@fortawesome/free-solid-svg-icons"
import FolderBreadCrumbs from "./FolderBreadCrumbs"

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color:#131313 ;
  height: 100%;
  overflow: scroll;

`

const SColContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const SDirectoryColumn = styled.div`
  border: 1px solid #232323;
  flex: 1;

  display: flex;
  flex-direction: column;
  height: 100%;
`

const SRow = styled.a`
  width: 100%;

  color: white;
  display: flex;
  gap: 5px;
  padding: 5px;
  font-size: 0.8rem;
  text-decoration: none;

  &:hover{
    background-color:#2b2b2b
  }
`

const SGridItem = styled.div`
  border: 2px solid red;
  border-radius: 4px;
  background-color: #f6f6f6;
  height: 100%;
  width: 100%;
`

const SFolderBreadCrumbs = styled(FolderBreadCrumbs)`
  border: 2px solid red;
  width: 100px;
  height: 100px;
  background-color:  lightblue;
`

export default function DashboardLanding({ childFolders, currentFolder }: any) {


  return (
    <SContainer>
      
      <SColContainer>
        <SDirectoryColumn>
          {childFolders &&
            childFolders.map((folder: any) => {
              return <SRow href={"/folder/" + folder.id}><FontAwesomeIcon icon={faFolder}/>{folder.name}</SRow>
            })}
        </SDirectoryColumn>

        <SDirectoryColumn></SDirectoryColumn>

        <SDirectoryColumn></SDirectoryColumn>
      </SColContainer>
    </SContainer>
  )
}
