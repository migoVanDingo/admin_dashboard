import React, { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import TreeView from "@mui/lab/TreeView"
import TreeItem from "@mui/lab/TreeItem"
import styled from "styled-components"
import { useAuth } from "../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderBlank } from "@fortawesome/free-solid-svg-icons"
import { Folder, ChevronRight, ArrowDownward } from "@mui/icons-material"
import TreeItemRecursive from "./TreeItemRecursive"


const SFileTreeContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: scroll;

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

export default function FileTree({ allFolders, rootId }: any) {
  const [expanded, setExpanded] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])


  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds)
  }

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds)
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
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
        <TreeItemRecursive parentId={rootId} >{allFolders}</TreeItemRecursive>
          
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
