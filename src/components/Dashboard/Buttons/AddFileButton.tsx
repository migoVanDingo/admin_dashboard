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
import { Files } from "../../../api/Files"

const SBootstrapButton = styled(Button)`
  background-color: green;
  border-radius: 4px;
  border: 1px solid #e2e2e2;
  color: #e2e2e2;
  text-align: center;

  padding: 2px;
  font-size: large;
  width: 35px;
  height: 40px;

  &:hover {
    background-color: #00aa00;
    color: white;
    border-color: white;
  }
`

interface IFilePayload {
  name: string
  folderId: string
  userId: string
  createdAt: Date
}

export default function AddFileButton({ currentFolder, setReload }: any) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)

  const { currentUser } = useAuth()
  const { folder } = useFolder(currentFolder)

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const payload: IFilePayload = {
      name: fileName,
      folderId: currentFolder.id,
      userId: currentUser.uid,
      createdAt: Folders.getDate(),
    }

    const newFile = await Files.addFile(payload)
    setReload(true)
    setLoading(false)
    setModalOpen(false)
  }

  return (
    <>
      <SBootstrapButton size={"sm"} variant="success" onClick={openModal}>
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
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add File
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
