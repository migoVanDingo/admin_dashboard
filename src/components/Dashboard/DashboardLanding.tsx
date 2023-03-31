import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import FolderBreadCrumbs from "./FolderBreadCrumbs"

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid green;
  position: relative;

`

const SColContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const SDirectoryColumn = styled.div`
  border: 1px solid green;
  flex: 1;

  display: flex;
  flex-direction: column;
`

const SRow = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid grey;
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
      <SFolderBreadCrumbs currentFolder={currentFolder} />
     {/*  <SColContainer>
        <SDirectoryColumn>
          {childFolders &&
            childFolders.map((folder: any) => {
              return <SRow>{folder.name}</SRow>
            })}
        </SDirectoryColumn>

        <SDirectoryColumn></SDirectoryColumn>

        <SDirectoryColumn></SDirectoryColumn>
      </SColContainer> */}
    </SContainer>
  )
}
