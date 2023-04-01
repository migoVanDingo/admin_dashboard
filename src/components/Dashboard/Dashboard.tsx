import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import Toolbar from "./Toolbar"
import styled from "styled-components"
import DashboardHeader from "./DashboardHeader"
import DashboardLanding from "./DashboardLanding"
import { useFolder } from "../../hooks/useFolder"
import { Folders } from "../../api/Folders"
import { useParams } from "react-router"
import FolderBreadCrumbs from "./FolderBreadCrumbs"

const SDashboard = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: [start] 220px [line2] auto [end] 0px;
  background-color: #232323;

  position: relative;
`

const SDashboardToolbar = styled(Toolbar)``

const SDashboardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 8px 1px;
`

const SRepoSpace = styled.div`
  grid-column: line2/end;
  height: calc(100vh - 30px);
  margin: 15px 25px;

  display: flex;
  flex-direction: column;
`

const SDashboardLanding = styled(DashboardLanding)`
  grid-column-start: line2;
  grid-column-end: end;
`

export default function Dashboard() {
  //Hooks
  const { currentUser } = useAuth()
  const { folderId } = useParams()

  const [currentFolder, setCurrentFolder] = useState<string | undefined>(
    folderId
  )

  const { folder, childFolders } = useFolder(currentFolder)
  //console.log(folder)

  useEffect(() => {
    setCurrentFolder(folderId)
  }, [folderId])


  //Functions

  if (currentUser) {
    return (
      <SDashboard>
        <Toolbar />
        <SRepoSpace>
          {folder && childFolders && (
            <SDashboardHeader>
              <FolderBreadCrumbs currentFolder={folder} />
              <DashboardHeader currentFolder={folder}  />
            </SDashboardHeader>
          )}

          {childFolders && (<DashboardLanding childFolders={childFolders} />)}
          
        </SRepoSpace>
      
      </SDashboard>
    )
  } else {
    return (
      <p style={{ color: "black", fontSize: "50px" }}>You've been signed out</p>
    )
  }
}
