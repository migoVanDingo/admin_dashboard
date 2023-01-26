import React from "react";
import styled from "styled-components";

const SToolbar = styled.div`

  background: #191919;

  display: flex;
  flex-direction: column;
  color: #d2d2d2;
  padding: 35px 40px;

  align-items: center;
  gap: 20px;

  font-size: 0.8rem;

  grid-column: 1 / 2;
  grid-row: 1 / 3;
  
`;
const SToolbarList = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SToolHeadingMed = styled.h3`
    font-size: 1.3rem;
    
`
const SToolHeadingSm = styled.h4`
    font-size: 1rem;
    justify-self: flex-start;
    width: 100%;

    font-weight: 400;
    
    
`

export default function Toolbar() {
  return (
    <SToolbar>
        <SToolHeadingMed>My Repo</SToolHeadingMed>
        <SToolHeadingSm>Folders</SToolHeadingSm>
      <SToolbarList>
        <a>link 1</a>
        <a>link 2</a>
        <a>link 3</a>
        <a>link 4</a>
      </SToolbarList>
    </SToolbar>
  );
}
