import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import Toolbar from "./Toolbar"
import styled from "styled-components"
import DashboardHeader from "./DashboardHeader"
import DashboardLanding from "./DashboardLanding"
import { useFolder } from "../../hooks/useFolder"
import { Folders } from "../../api/Folders"
import { useParams } from "react-router"
//import FolderBreadCrumbs from "./FolderBreadCrumbs"
import ControlledTreeView from "./ControlledTreeView"
import FileTree from "./FileTree"

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
  const { currentUser } = useAuth()

  const [folderId, setFolderId] = useState<string>(currentUser.uid)
  const [folders, setFolders] = useState<any[]>([])
  const [path, setPath] = useState<any[]>([])
  const [rootFolder, setRootFolder] = useState<any>(currentUser.uid)

  //const { folder, allFolders } = useFolder(folderId)

  useEffect(() => {
    const fetchAllFolders = async (folderId: string) => {
      return await Folders.getFolders(folderId)
    }
    
    const allFolders = fetchAllFolders(folderId)
    allFolders.then((result: any) => {
      setFolders(result)
    })
    .catch((err: any) => {
      console.log(err)
    })

  }, [folderId])

  if (currentUser) {
    return (
      <SDashboard>
        <Toolbar allFolders={folders} rootId={currentUser.uid} />
        <SRepoSpace>
          {/* <DashboardHeader
            currentFolder={folder}
            setCurrentFolder={setFolderId}
          /> */}
          {/* <SDashboardHeader>
            <FolderBreadCrumbs currentFolder={folder} />
            
          </SDashboardHeader>

          <DashboardLanding
            rootFolder={rootFolder}
            currentFolder={currentFolder}
            allFolders={allFolders}
            setFolderId={setFolderId}
            path={path}
          /> */}
        </SRepoSpace>
      </SDashboard>
    )
  } else {
    return (
      <p style={{ color: "black", fontSize: "50px" }}>You've been signed out</p>
    )
  }
}
