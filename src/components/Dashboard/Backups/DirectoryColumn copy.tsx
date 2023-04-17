import React, { useEffect, useState,  } from 'react'
/* import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faF, faFolder } from "@fortawesome/free-solid-svg-icons"

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

  &.selected {
    background-color: #00b1ec;

    &:hover {
      background-color: #00b1ec;
    }
  }

  &:hover {
    background-color: #2b2b2b;
  }
`
interface IDirectoryColumn{
    selectedFolder: string
    allFolders: any[]
    setSelectedFolder: (a: any) => void
    setCurrentFolder: (a:any) =>void
    selectedFolder1?: string
    selectedFolder2?: string
    handleClick?: (e:any) => void
}

export default function DirectoryColumn({ 
    selectedFolder, 
    allFolders, 
    setSelectedFolder, 
    setCurrentFolder, 
    selectedFolder1, 
    selectedFolder2, 
    handleClick 
}: IDirectoryColumn) {

    //console.log("DC: " + currentFolder)

    useEffect(() => {

    },[])

    

    function handleClick(e: any){
        setCurrentFolder(e.target.id)
        setSelectedFolder(e.target.id)
    }

  return (
    <SDirectoryColumn>
          {allFolders &&
            allFolders.map((folder: any, index: any) => {

              return (
                <SRow
                  key={index}
                  onClick={handleClick}
                  id={folder.id}
                  className={ selectedFolder === folder.id ? "selected" : "" }
                  href={"/folder/" + folder.id}
                >
                  <FontAwesomeIcon icon={faFolder} />
                  {folder.name}
                </SRow>
              )
            })}
        </SDirectoryColumn>
  )
}
 */