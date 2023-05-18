import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRight from "@mui/icons-material/ChevronRight"
import TreeView from "@mui/lab/TreeView"
import TreeItem from "@mui/lab/TreeItem"
import styled from "styled-components"
import { useAuth } from "../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderBlank } from "@fortawesome/free-solid-svg-icons"
import { Folder, ArrowDownward } from "@mui/icons-material"
import TreeItemRecursive from "./TreeItemRecursive"


const SFileTreeContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: scroll;
  padding: 0;
  margin: 0;

`

const SFolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SFolderIcon = styled(FontAwesomeIcon)``

const STreeItem = styled(TreeItem)`
  width: auto;
  float: none;
`

const SChevron = styled(ChevronRight)`
  color: white;
`

export default function FileTree({ allFolders, rootId, setCurrentFolderId, folderId }: any) {
  const [expanded, setExpanded] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [current, setCurrent] = useState<any>({})

  useEffect(() => {
    setSelected(folderId)
    const currentFolder = allFolders.filter((folder: any) => folder.id === folderId)
    
    if(currentFolder !== null && currentFolder !== undefined && folderId !== rootId){
   
      
      setCurrent(currentFolder)
      const path = currentFolder[0].path
      /* console.log("folderID: " + folderId)
      console.log("path: " + JSON.stringify(path)) */
      path.shift()
    
      const expandIds = path.map((p: any) => p.id)
      
      expandIds.push(folderId)

      /* if(expandIds.includes(folderId))
      {
        expandIds = expandIds.filter((id: any) => id !== folderId)
      } else {
        expandIds.push(folderId)
      } */
      
      
      //console.log("expand: " + JSON.stringify(expandIds))
      setExpanded(expandIds)
      

    }
    
  }, [folderId])

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds.reverse())
  }

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds)
    setExpanded(nodeIds)
  }

    const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ["1", "5", "6", "7"] : []
    )
  }

  const handleSelectClick = () => {
    setSelected((oldSelected) =>
      oldSelected.length === 0
        ? ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        : []
    )
  }

  //console.log("HERE: " + JSON.stringify(allFolders))

  return (
    <SFileTreeContainer>
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
        <TreeItemRecursive setExpanded={setExpanded} parentId={rootId} setCurrentFolderId={setCurrentFolderId} folderId={folderId}>{allFolders}</TreeItemRecursive>
          
        {/* {allFolders &&
          allFolders.map((folder: any) => {
            if (folder.parentId == rootId) {
              return (
                
                  <STreeItem
                    
                    key={folder.id}
                    nodeId={folder.id}
                    label={folder.name}

                    icon={<Folder/>}
                    expandIcon={<ChevronRight/>}
                    collapseIcon={<ArrowDownward/>}

                  >
                    
                  </STreeItem>
              
              )
            }
          })} */}
      </TreeView>
    </SFileTreeContainer>
  )
}
