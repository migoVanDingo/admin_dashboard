import React from "react"
import styled from "styled-components"
import AddFileButton from "./Buttons/AddFileButton"
import AddFolderButton from "./Buttons/AddFolderButton"

const SHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
  border-bottom: 0.1px solid #4e4e4e;
  border: 2px solid red;
`

const SSearchbar = styled.input`
  border-radius: 100px;
  padding: 3px 20px;
  width: 500px;
  height: 60%;
  background-color: #cfcfcf;
`

const SButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export default function DashboardHeader({ }: any) {
  

  

  return (
    <SHeader>
 
      
      <SButtonContainer>
        <AddFolderButton/>
        <AddFileButton/>
      </SButtonContainer>
    </SHeader>
  )
}
