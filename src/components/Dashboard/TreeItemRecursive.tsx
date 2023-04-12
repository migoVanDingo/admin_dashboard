import React, { useEffect, useState } from "react"
import styled from "styled-components"
import TreeItem from "@mui/lab/TreeItem"
import { Folder, ChevronRight, ArrowDownward } from "@mui/icons-material"

const STreeItem = styled(TreeItem)`
  width: auto;
  float: none;
`

export default function TreeItemRecursive({ parentId, children }: any) {
  //console.log("TIR: " + parentId)
  //console.log("chi: " + JSON.stringify(children))

  const [newChildren, setNewChildren] = useState<any[]>([])

  useEffect(() => {
    const kiddos = findChildren(parentId)
    console.log(kiddos)
    setNewChildren(kiddos && kiddos)
  }, [children, parentId])

  const findChildren = (parentId: any) => {
    return children.filter((newKid: any) => newKid.parentId === parentId)
  }

  //console.log(parentId + JSON.stringify(children))
  console.table(children)
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
              collapseIcon={<ArrowDownward />}
            >
              {
                <TreeItemRecursive parentId={folder.id}>
                  {children}
                </TreeItemRecursive>
              }
            </TreeItem>
          )
        })}
    </>
  )
}
