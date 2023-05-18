import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

const SIconContainer = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 20px;
    background-color: transparent;
    border: none;
    padding: 13px 20px 0px;
    border-radius: 8px;


    &:hover{
        background-color: #e1e1e1;
    }
`

const SIcon = styled(FontAwesomeIcon)`
    font-size: 40px;
    color: #3c3c3c;
`

const SFileName = styled.p`
    font-size: 0.7em;
    color: #3c3c3c;
    margin-top: 10px;
`



export default function PageFileButton({ file }: any) {

    const handleDoubleClick = () => {
        console.log("fileID: " + file.id)
    }

  return (
    <SIconContainer onDoubleClick={handleDoubleClick}>
        <SIcon icon={faFile}/>
        <SFileName>{file.name}</SFileName>
    </SIconContainer>
  )
}
