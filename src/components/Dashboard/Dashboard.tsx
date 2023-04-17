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
import { Files } from "../../api/Files"

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
  const [files, setFiles] = useState<any[]>([])
  const [path, setPath] = useState<any[]>([])
  const [rootFolder, setRootFolder] = useState<any>(currentUser.uid)
  const [reload, setReload] = useState<boolean>(false)
  const [currentFolder, setCurrentFolder] = useState<any>()

  //const { folder, allFolders } = useFolder(folderId)

  //Get All Folders
  useEffect(() => {

    
      const fetchAllFolders = async (userId: string) => {
        return await Folders.getFolders(userId)
      }
  
      
      const allFolders = fetchAllFolders(rootFolder)
      allFolders
        .then((result: any) => {
          result.sort((a: any,b: any) => (a.createdAt.seconds > b.createdAt.seconds) ? 1 : ((b.createdAt.seconds > a.createdAt.seconds) ? -1 : 0))
          setFolders(result)
        })
        .catch((err: any) => {
          console.log(err)
        })

        setReload(false)
   

    
  }, [folderId, reload])


  //Get Current Folder
  useEffect(() => {
  
    const getCurrentFolder = async (folderId: string) => {
      return await Folders.getFolderById(folderId)
    }

    
    const returnCurrent = (folderId: string) => {
      const currentFolder = getCurrentFolder(folderId)
      currentFolder.then((result: any ) => {
       setCurrentFolder(result)
      })

    }

    returnCurrent(folderId)

  },[folderId]) 


  //Get folder files
  useEffect(() => {

    const fetchAllFiles = async (userId: string) => {
      return await Files.getFiles(userId)
    }

    
    const allFiles = fetchAllFiles(rootFolder)
    allFiles
      .then((result: any) => {
        result.sort((a: any,b: any) => (a.createdAt.seconds > b.createdAt.seconds) ? 1 : ((b.createdAt.seconds > a.createdAt.seconds) ? -1 : 0))
        setFiles(result)
      })
      .catch((err: any) => {
        console.log(err)
      })

      setReload(false)
 

  
}, [folderId, reload])


  

  console.log("currentFolder: " + JSON.stringify(currentFolder))
  if (currentUser) {
    return (
      <SDashboard>
        <Toolbar
          allFolders={folders}
          rootId={currentUser.uid}
          setCurrentFolderId={setFolderId}
          folderId={folderId}
        />
        <SRepoSpace>
          <DashboardHeader
            currentFolder={currentFolder}
            setCurrentFolder={setFolderId}
            setReload={setReload}
          />

          <DashboardLanding
            rootFolder={rootFolder}
            currentFolder={currentFolder}
            allFolders={folders}
            setFolderId={setFolderId}
            files={files}
            //path={path}
          />
        </SRepoSpace>
      </SDashboard>
    )
  } else {
    return (
      <p style={{ color: "black", fontSize: "50px" }}>You've been signed out</p>
    )
  }
}
