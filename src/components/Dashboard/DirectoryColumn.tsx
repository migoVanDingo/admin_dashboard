import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faF, faFolder } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../context/AuthContext"
import { useFolder } from "../../hooks/useFolder"

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


export default function DirectoryColumn({
  currentFolder,
  allFolders,
  setFolderId
}: any) {



  function handleClick(e: any) {
    setFolderId(e.target.id)
  }

  /* console.log("folder: " + JSON.stringify(currentFolder))
  console.log("id: " + currentFolder.id) */

  return (
    <SDirectoryColumn>
      {allFolders &&
        allFolders.map((folder: any, index: any) => {
         
            
            return (
                
              <SRow
                key={index}
                onClick={handleClick}
                id={folder.id}
                className={
                    currentFolder.id === folder.id ? "selected" :  ""
                }
                /* href={"/folder/" + folder.id} */
              >
                <FontAwesomeIcon icon={faFolder} />
                {folder.name}
              </SRow>
            )
          
        })}
    </SDirectoryColumn>
  )
}
