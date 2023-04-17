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
        background-color: #232323;
    }
`

const SIcon = styled(FontAwesomeIcon)`
    font-size: 40px;
`

const SFileName = styled.p`
    color:white;
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
