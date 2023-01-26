import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Toolbar from './Toolbar'
import styled from 'styled-components'
import DashboardHeader from './DashboardHeader'
import DashboardLanding from './DashboardLanding'

const SDashboard = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: [start] 300px [line2] auto [end] 0px;
  background-color: #232323;

  grid-template-rows: [top] 100px [first] auto [bottom] 0px;
  
`

const SDashboardToolbar = styled(Toolbar)`
 


  
`

const SDashboardHeader = styled(DashboardHeader)`
  grid-column-start: line2;
  grid-column-end: end;

  grid-row-start: top;
  grid-row-end: first;
`

const SDashboardLanding = styled(DashboardLanding)`
  grid-column-start: line2;
  grid-column-end: end;

  grid-row-start: first;
  grid-row-end: bottom;



`


export default function Dashboard() {

    const { currentUser } = useAuth()
    const [email, setEmail] = useState<string>(currentUser.email)

    
    if(currentUser){
      return (
        <SDashboard>
          <Toolbar />
          <SDashboardHeader />
          <DashboardLanding />
        </SDashboard>
        
      )
    }else{
      return(<p style={{color:"black", fontSize:"50px"}}>You've been signed out</p>)
    }
  
}
