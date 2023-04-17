import React, { useEffect, useState } from "react"
/* import styled from "styled-components"
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

interface IDashboardLanding {
  currentFolder: any
  setCurrentFolder: (folderId: any) => void
  allFolders: any
}

export default function DashboardLanding({
  currentFolder,
  setCurrentFolder,
  allFolders,
}: IDashboardLanding) {

  const [generation1, setGeneration1] = useState<any[]>([])
  const [generation2, setGeneration2] = useState<any[]>([])
  const [generation3, setGeneration3] = useState<any[]>([])

  const [selectedFolder1, setSelectedFolder1] = useState<any>("")
  const [selectedFolder2, setSelectedFolder2] = useState<any>("")
  const [selectedFolder3, setSelectedFolder3] = useState<any>("")

  const [level, setLevel] = useState<number>(2)

  useEffect(() => {
    
      const g1 = allFolders.filter(
        (folder: any) => folder.path.length === level
      )
      setGeneration1(g1)
    
  }, [allFolders, level])

  useEffect(() => {

    if (selectedFolder1 !== "") {
      const g2 = allFolders.filter(
        (folder: any) =>
          folder.path.length === level + 1 &&
          folder.parentId === selectedFolder1
      )
      setGeneration2(g2)
    } else {
      setGeneration2([])
    }
  }, [selectedFolder1, allFolders, level])

  useEffect(() => {
    if (selectedFolder2 !== "") {
      const g3 = allFolders.filter(
        (folder: any) =>
          folder.path.length === level + 2 &&
          folder.parentId === selectedFolder2
      )
      setGeneration3(g3)
    } else {
      setGeneration3([])
    }
  }, [selectedFolder2, allFolders, level])

  const handleClickFolderCol1 = (e: any) => {
    setCurrentFolder(e.target.id)
    setSelectedFolder1(e.target.id)

    setSelectedFolder2("")
    setSelectedFolder3("")

    
  }

  const handleClickFolderCol2 = (e: any) => {
    setCurrentFolder(e.target.id)
    setSelectedFolder2(e.target.id)

    setSelectedFolder3("")

    
  }

  const handleClickFolderCol3 = (e: any) => {
    setCurrentFolder(e.target.id)
    setSelectedFolder3(e.target.id)
    setLevel(level+1)

    
  }



  console.log(allFolders)

  return (
    <SContainer>
      <SColContainer>
        <DirectoryColumn
          handleClick={handleClickFolderCol1}
          selectedFolder={selectedFolder1}
          allFolders={generation1}
          setSelectedFolder={setSelectedFolder1}
          setCurrentFolder={setCurrentFolder}
        />
        <DirectoryColumn
        handleClick={handleClickFolderCol2}
          selectedFolder={selectedFolder2}
          allFolders={generation2}
          selectedFolder1={selectedFolder1}
          setSelectedFolder={setSelectedFolder2}
          setCurrentFolder={setCurrentFolder}
        />
        <DirectoryColumn
        handleClick={handleClickFolderCol3}
          selectedFolder={selectedFolder3}
          allFolders={generation3}
          setSelectedFolder={setSelectedFolder3}
          setCurrentFolder={setCurrentFolder}
        />
      </SColContainer>
    </SContainer>
  )
}

 */