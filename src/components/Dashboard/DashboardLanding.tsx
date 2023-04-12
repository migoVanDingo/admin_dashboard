import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faF, faFolder } from "@fortawesome/free-solid-svg-icons"
import FolderBreadCrumbs from "./FolderBreadCrumbs"
import { Folders } from "../../api/Folders"
import { useAuth } from "../../context/AuthContext"
import { useFolder } from "../../hooks/useFolder"
import DirectoryColumn from "./DirectoryColumn"

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #131313;
  height: 100%;
  overflow: scroll;
`

const SColContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

export default function DashboardLanding({
  rootFolder,
  currentFolder,
  allFolders,
  path,
  setFolderId,
}: any) {
  const [folder, setFolder] = useState<any>()

  useEffect(() => {}, [])

  /*   console.log(rootFolder.id)
  console.log(currentFolder)
  console.log(currentFolder.id) */
  return (
    <SContainer>
      <SColContainer>
        {allFolders && path.length === 0 && (
          <DirectoryColumn
            key={rootFolder.id}
            currentFolder={rootFolder}
            allFolders={allFolders}
            setFolderId={setFolderId}
          />
        )}
        {/*  {allFolders && path.length > 0 &&
        path.map((directory: any) => {
          return(
            <DirectoryColumn
                key={directory.id}
                currentFolder={directory.id}
                allFolders={allFolders}
                setFolderId={setFolderId}
              />
          )
        })
      } */}
      </SColContainer>
    </SContainer>
  )
}
