import React from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const SHeader = styled.div`
  display: flex;
  flex-direction: row;
  //padding: 0px 40px 0px;
  align-items: center;
  
  //margin-top: 20px;
  position: relative;
  justify-content: space-between;
  //padding-bottom: 20px;
  border-bottom: 0.1px solid #4e4e4e;
  padding: 15px 40px;

  grid-column: 2 / 3;
  grid-row: 1 / 2;
  
`;

const SSearchbar = styled.input`
  border-radius: 100px;
  padding: 3px 20px;
  width: 500px;
  height: 60%;
  background-color: #cfcfcf;
`;

const SDashLogout = styled.a`
  color: #d2d2d2;
  width: 100px;
`;

export default function DashboardHeader() {

    const { logout } = useAuth();

  function handleLogout() {
    logout()
  }


  return (
    <SHeader>
      <SSearchbar type="text" placeholder="Search" />
      <SDashLogout onClick={handleLogout}>Logout</SDashLogout>
    </SHeader>
  );
}
