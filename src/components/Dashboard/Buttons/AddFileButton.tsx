import React, { useState } from "react"
import styled from "styled-components"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../../context/AuthContext"
import { Folders } from "../../../api/Folders"
import { useFolder } from "../../../hooks/useFolder"

const SBootstrapButton = styled(Button)`
 
  background-color: green;
  border-radius: 4px;
  border: 1px solid #e2e2e2;
  color: #e2e2e2;
  text-align: center;

  padding: 2px;
  font-size: small;
  width: 23px;

  font-size: small;
  &:hover {
    background-color: #00aa00;
    color:white;
    border-color: white;
  }
`

export default function AddFileButton({ currentFolder }:any) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>("")
  
    const { currentUser } = useAuth()
    const { folder } = useFolder(currentFolder);
  
    const closeModal = () => {
      setModalOpen(false)
    }
  
    const handleClick = async () => {
  
      setModalOpen(true)
      const payload = {
        name: folderName,
        parentId: currentFolder,
        path: [...folder.path],
        userId: currentUser.uid,
        createdAt: Folders.getDate(),
      }
      console.log(payload)
  
      //const newFolder = await Folders.addFolder(payload)
    }
  
    const handleSubmit = (e: any) => {
      e.preventDefault()
      console.log("hi :)")
    }
  
    return (
      <>
        <SBootstrapButton size={"sm"} variant="success" onClick={handleClick}>
          <FontAwesomeIcon icon={faFileUpload} />
        </SBootstrapButton>
  
        <Modal show={isModalOpen} onHide={closeModal}>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>File Name</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Close</Button>
              <Button variant="success" type="submit">Add File</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
}
