import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faF, faFolder } from "@fortawesome/free-solid-svg-icons"
import FolderBreadCrumbs from "./FolderBreadCrumbs"
import { Folders } from "../../api/Folders"
import { useAuth } from "../../context/AuthContext"
import { useFolder } from "../../hooks/useFolder"
import DirectoryColumn from "./DirectoryColumn"
import PageFolderButton from "./Buttons/PageFolderButton"
import PageFileButton from "./Buttons/PageFileButton"

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #2b2b2b;
  width: 100%;
  height: 100%;
  overflow: scroll;

  margin-top: 20px;
`

const SRow = styled.div`

  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px 60px;
  gap: 40px;
`

export default function DashboardLanding({
  rootFolder,
  currentFolder,
  allFolders,
  setFolderId,
  files
}: any) {

  const [pageFolders, setPageFolders] = useState<any[]>([])

  useEffect(() => {

    const getPageFolders = (currentFolder: any, allFolders: any[]) => {
      return allFolders.filter((folder: any) => folder.parentId === currentFolder.id)
    }

    const returnPageFolders = () => {
      if (currentFolder !== null && allFolders !== null) {
        const folders = getPageFolders(currentFolder, allFolders)
        setPageFolders(folders)
      }
    }

    return returnPageFolders()

  }, [currentFolder, allFolders])



  return <SContainer>
    <SRow>
    {
      pageFolders && pageFolders.map((folder: any) => {
        return(   
          <PageFolderButton key={folder.id} folder={folder} setFolderId={setFolderId}/>
        )
      })
    }
    </SRow>
    <SRow>
    {
      files && files.map((file: any) => {
        return(
          <PageFileButton key={file.id} file={file} />
        )
      })
    }
    </SRow>
  </SContainer>
}
