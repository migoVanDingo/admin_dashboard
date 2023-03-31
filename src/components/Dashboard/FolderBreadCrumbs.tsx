import React from "react"
import Breadcrumb from "react-bootstrap/Breadcrumb"
import BreadcrumbItem from "react-bootstrap/esm/BreadcrumbItem"
import { Link } from "react-router-dom"
import { useFolder } from "../../hooks/useFolder"
import styled from "styled-components"

const SLink = styled(Link)`
    text-decoration: none;
`

const SBreadcrumbItem = styled(BreadcrumbItem)`
    position:relative;
    text-decoration: none;

`

export default function FolderBreadCrumbs({ currentFolder }: any) {

console.log(currentFolder)
    let path: any[] = []

    if(currentFolder.name === "root"){
        path = [{id: currentFolder.id, name: currentFolder.name}]
    } else if (currentFolder.path.length > 0){
        path = [...currentFolder.path, { id: currentFolder.id, name: currentFolder.name}]
    } else {
        console.log("path: " + path)
        console.error("no path: FolderBreadCrumbs")
    }

    console.log("path: " + JSON.stringify(path))

  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "p-0 m-0" }}
      style={{ textDecoration: "none"}}
    >
      {

      path.map((folder: any, index: number) => {
        console.log(folder.name)
        return (
            <>
            
          <BreadcrumbItem
            key={index}
            linkAs={SLink}
            linkProps={{
              to: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            }}
            className="text-truncate d-inline-block"
            style={{ maxWidth: "150px"}}
          >
          {"/"} {folder.name}
          </BreadcrumbItem>
          </>
        )
      })}
    </Breadcrumb>
  )
}
