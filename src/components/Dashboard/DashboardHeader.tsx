import React from "react"
import styled from "styled-components"
import AddFileButton from "./Buttons/AddFileButton"
import AddFolderButton from "./Buttons/AddFolderButton"
import ConvertCsvButton from "./Buttons/ConvertCsvButton"

const SHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
  /* border-bottom: 0.1px solid #4e4e4e; */
  margin-left: 20px;

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
  gap: 5px;
`

export default function DashboardHeader({ currentFolder, setCurrentFolder, setReload }: any) {
  
  return (
    <SHeader>
      <SButtonContainer>
        <AddFolderButton setReload={setReload} currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} />
        <AddFileButton currentFolder={currentFolder} setReload={setReload}/>
        <ConvertCsvButton currentFolder={currentFolder} setReload={setReload}/>

      </SButtonContainer>
    </SHeader>
  )
}
