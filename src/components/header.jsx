import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #171a2e;
  border-bottom: 1px solid #2a2e4a;
`;

const Logo = styled(Link)`
  color: #7c5cff;
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled(NavLink)`
  color: #b8b8cc;
  text-decoration: none;
  font-weight: 500;
  &.active {
    color: #7c5cff;
  }
`;

export default function Header() {
  return (
    <Bar>
      <Logo to="/">Каталог игр</Logo>
      <Nav aria-label="Main navigation">
        <NavItem to="/">Игры</NavItem>
        <NavItem to="/favorites">Избранное</NavItem>
      </Nav>
    </Bar>
  );
}