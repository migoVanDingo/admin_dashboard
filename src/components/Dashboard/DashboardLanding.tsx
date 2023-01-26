import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const SContainer = styled.div`

  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);

  gap: 30px;
  padding: 50px;
  
`;

const SGridItem = styled.div`
  border: 2px solid red;
  border-radius: 4px;
  background-color: #f6f6f6;
  height: 100%;
  width: 100%;

`;

export default function DashboardLanding() {
  return (
    <SContainer>
      <SGridItem ><FontAwesomeIcon icon={faFolder} /></SGridItem>
      <SGridItem ></SGridItem>
      <SGridItem ></SGridItem>
      <SGridItem ></SGridItem>

      <SGridItem ></SGridItem>
      <SGridItem ></SGridItem>
      <SGridItem ></SGridItem>
      <SGridItem ></SGridItem>
    </SContainer>
  );
}
