import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRecycle } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../../context/AuthContext"
import { Folders } from "../../../api/Folders"
import { useFolder } from "../../../hooks/useFolder"
import { Files } from "../../../api/Files"
import { MDBFile } from 'mdb-react-ui-kit';
import UploadService from "../../../services/FileUploadService"
import { doc } from "firebase/firestore"

const SBootstrapButton = styled(Button)`
  background-color: purple;
  border-radius: 4px;
  color: #e2e2e2;
  text-align: center;

  padding: 2px;
  font-size: large;
  width: 35px;
  height: 40px;

  &:hover {
    background-color: #00aa00;
    color: white;
 
  }
`

interface IFilePayload {
  name: string
  folderId: string
  userId: string
  createdAt: Date
  ext: string
}

const ConvertCsvButton = ({ currentFolder, setReload }: any) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)
  
    const { currentUser } = useAuth()
    const { folder } = useFolder(currentFolder)
  
    const [uploadLocalFiles, setUploadLocalFiles] = useState<any[]>([])
  
  
    const [selectedFiles, setSelectedFiles] = useState<any[]>([])
    const [currentFile, setCurrentFile] = useState<any>(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState("")
  
    const [fileInfos, setFileInfos] = useState([])
  
  
  
    const upload = (fileName: string) => {
      let uploadFile = selectedFiles[0]
  
      console.log(uploadFile)
      const renamedFile = new File([uploadFile], fileName, { type: uploadFile.type, lastModified: uploadFile.lastModified})
  
      console.log(renamedFile)
      setProgress(0)
      setCurrentFile(renamedFile)
  
      UploadService.convertCsv(renamedFile, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total))
      })
        .then((response) => {
          setMessage(response.data.message)
          console.log(response.data.message)
          return UploadService.getFiles()
        })
        .then((files) => {
          setFileInfos(files.data)
        })
        .catch(() => {
          setProgress(0)
          setMessage("Could not upload the file!")
          setCurrentFile(undefined)
        })
  
      setSelectedFiles([])
    }

    const convert = async () => {
        const response = await UploadService.getCsvTest()
        if(response){
            console.log(response)
        } else {
            console.log('no json response')
        }
    }
  
  
  
    const closeModal = () => {
      setModalOpen(false)
    }
  
    const openModal = () => {
      setModalOpen(true)
    }
  
    const handleChange = (e: any) => {
      setSelectedFiles(e.target.files)
    }
    
    const handleSubmit = async (e: any) => {
      e.preventDefault()
      setLoading(true)
  
      const extArr = selectedFiles[0].name.split(".")
      const fileExtension = extArr[extArr.length - 1]
  
      const payload: IFilePayload = {
        name: selectedFiles[0].name,
        ext: fileExtension,
        folderId: currentFolder.id,
        userId: currentUser.uid,
        createdAt: Folders.getDate(),
      }
  
      const newFile = await Files.addFile(payload)
      if(newFile !== null && newFile !== undefined){
  
        const newFileName = newFile.id + "." + fileExtension
        upload(newFileName)
      }
      
  
      
      
      setReload(true)
      setLoading(false)
      setModalOpen(false)
    }
  
    return (
      <>
        <SBootstrapButton size={"sm"} variant="success" onClick={convert}>
          <FontAwesomeIcon icon={faRecycle} />
        </SBootstrapButton>
  
        <Modal show={isModalOpen} onHide={closeModal}>
          <Form  encType="multipart/form-data" onSubmit={handleSubmit}>
            
            <Modal.Body>
              <Form.Group>
                <MDBFile label='Upload file'  id='upload_file' name="upload_file" multiple={true} onChange={handleChange}/>
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

export default ConvertCsvButton