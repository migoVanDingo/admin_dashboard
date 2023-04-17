import React, { useEffect, useState } from "react"
import styled from "styled-components"
import TreeItem from "@mui/lab/TreeItem"
import { Folder, ChevronRight, ExpandMore } from "@mui/icons-material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const SItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;


`

const SFaIcon = styled(FontAwesomeIcon)`
    color: white;
`


export default function TreeItemRecursive({ parentId, setCurrentFolderId, setExpanded, folderId, children }: any) {


  const [newChildren, setNewChildren] = useState<any[]>([])

  useEffect(() => {
    const kiddos = findChildren(parentId)
    setNewChildren(kiddos && kiddos)
  }, [children, parentId])

  const findChildren = (parentId: any) => {
    return children.filter((newKid: any) => newKid.parentId === parentId)
  }

  const handleClick = (folderId: string, fid: string) => {
      setCurrentFolderId(folderId)
  }


  return (
    <>
      {newChildren &&
        newChildren.map((folder: any) => {
          return (
          
            <TreeItem
              key={folder.id}
              nodeId={folder.id}
              label={folder.name}
              icon={<Folder />}
              expandIcon={<ChevronRight />}
              collapseIcon={<ExpandMore />}
              onClick={() => handleClick(folder.id, folderId)}
            >
              {
                <TreeItemRecursive setCurrentFolderId={setCurrentFolderId} parentId={folder.id}>
                  {children}
                </TreeItemRecursive>
              }
            </TreeItem>
          
          )
        })}
    </>
  )
}
