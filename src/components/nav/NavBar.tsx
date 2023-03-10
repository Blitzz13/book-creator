import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function NavBar() {
  const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
  `;

  const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 2rem;
  `;

  return (
    <>
      <Wrapper>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </Wrapper>
    </>
  );
}