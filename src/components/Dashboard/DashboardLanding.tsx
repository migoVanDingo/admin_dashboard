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
  background-color: #fcfcfc;
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

const SFormSpace = styled.form`
  width: 100%;
  height: 100%;
  
  &.drag-active {
    border: 1px solid red;
  }
`

const SHiddenInput = styled.input`
  position: absolute;
  z-index: -1000;
  width: 100%;
  height: 100%;
  top: 0;
  left:0;
`
export default function DashboardLanding({
  rootFolder,
  currentFolder,
  allFolders,
  setFolderId,
  files
}: any) {

  const [pageFolders, setPageFolders] = useState<any[]>([])
  const [isDragActive, setDragActive] = useState<boolean>(false)

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

  /* const handleFileUpload = () => {

  }

  const handleDragEnter = (e: any) => {
    console.log("dragonL: " + e.type)
    setDragActive(true)

  }

  const handleDragLeave = (e: any) => {
    console.log("left")
    setDragActive(false)
  } 

  const handleDrop = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      //console.log(e.dataTransfer.files)
      console.log("dropped")
    }
  };

  const logChange = (e:any) => {
    console.log(e.target.value)
  } */


  return <SContainer>
{/*     <SFormSpace className={isDragActive ? "drag-active" : ""} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} encType="multipart/form-data" onSubmit={handleFileUpload} >
      <SHiddenInput type="file" name="upload_file" id="upload_file" multiple={true} onChange={logChange}/> */}
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
{/*     </SFormSpace> */}
  </SContainer>
}
