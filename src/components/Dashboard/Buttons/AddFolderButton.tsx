import React, { useState } from "react"
import styled from "styled-components"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../../context/AuthContext"
import { Folders } from "../../../api/Folders"
import { useFolder } from "../../../hooks/useFolder"

const SBootstrapButton = styled(Button)`
 
  background-color: #d1cdcd;
  border-radius: 4px;
  border: 1px solid green;
  color: green;
  text-align: center;

  &:hover {
    background-color: #90afbd;
  }
`

export default function AddFolderButton({ currentFolder }: any) {
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
      <SBootstrapButton onClick={handleClick}>
        <FontAwesomeIcon icon={faFolderPlus} />
      </SBootstrapButton>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
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
            <Button variant="success" type="submit">Add Folder</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
