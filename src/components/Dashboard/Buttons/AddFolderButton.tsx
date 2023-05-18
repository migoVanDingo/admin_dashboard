import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../../context/AuthContext"
import { Folders } from "../../../api/Folders"
import { useFolder } from "../../../hooks/useFolder"
import { Timestamp } from "firebase/firestore"
import { useNavigate } from "react-router"

const SBootstrapButton = styled(Button)`
 
  background-color: #d1cdcd;
  border-radius: 4px;

  color: #e2e2e2;
  text-align: center;
  padding: 2px;
  font-size: large;
  width: 35px;
  height: 40px;
  background-color: #004bad;
  &:hover {
    background-color: #006eff;
    color:white;

  }
`

interface IFolderPayload {
  name: string
  parentId: string
  path: string[]
  userId: string
  createdAt: Date
}

interface IAddFolderButton{
  currentFolder: any
  setCurrentFolder: (folderId: string) => void
  setReload: (key: boolean) =>  void
}

export default function AddFolderButton({ currentFolder, setCurrentFolder, setReload }: IAddFolderButton) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [folderName, setFolderName] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)

  const { currentUser } = useAuth()

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    
    const payload: IFolderPayload = {
      name: folderName,
      parentId: currentFolder.id,
      path: [...currentFolder.path, { id: currentFolder.id, name: currentFolder.name }],
      userId: currentUser.uid,
      createdAt: Folders.getDate(),
    }
    

    const newFolder = await Folders.addFolder(payload)
    setReload(true)
    //setCurrentFolder(newFolder.id)
    setLoading(false)
    setModalOpen(false)

 
    
  }

  return (
    <>
      <SBootstrapButton size={"sm"} onClick={openModal}>
        <FontAwesomeIcon icon={faFolderPlus} />
      </SBootstrapButton>

      <Modal show={isModalOpen} onHide={closeModal}>
    
          <Form onSubmit={handleSubmit}>
          <Modal.Body>
          {
          isLoading ? <Form.Group>
           <h1>Loading</h1> 
          </Form.Group> : 
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required={true}
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
            <Button disabled={isLoading} variant="success" type="submit">Add Folder</Button>
          </Modal.Footer>
        </Form>
        
        
      </Modal>
    </>
  )
}
