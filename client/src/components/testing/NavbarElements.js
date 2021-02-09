import styled from 'styled-components';
import { Link as LinkR} from 'react-router-dom';
import { Link as LinkS} from 'react-scroll';
 const colors = {
    white: '#fff',
    black: '#000',  
    gray: '#818181',
    primary: '#FFBF46',
    secondary: '#59FFA0'
}
export const Nav = styled.nav`
    background: #000;
    height:80px;
    display: flex;
    justify-content: center;
    align-items: center'
    font-size: 1rem;
    position:sticky,
    top:0;
    z-index:10;

    @media screen and (max-width:960px) {
        transition:0.8s all ease;
    }
`
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 110px;
`
export const NavLogo = styled(LinkR)`
  color: green;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weigh: bold;
  text-decoration: none;
`
export const MobileIcon = styled.div`
  display: none;

  @media screen and (max_width:768px){
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;\
      cursor: pointer;
      color: #fff;
  }
`
export const NavMenu = styled.ul`
  display: flex;
  align-items; center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px){
      display:none;
  }
`

export const NavItem = styled.li`
  height: 80px;
`
export const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active{
      border-bottom 3px solid #01bf71;
  }
`
export const Searchbar = styled.div`
  top: 20%;
  height: 40px;
  width: 40px;
  position: relative;
  margin: 0 24px;
  input {
    left:400%;
    bottom: 0%;  
    height: 45px;
    padding: 0 64px;
    width: 500px;
    border-radius: ${props => props.squared ? "0px" : "100px"};
    border: none;
    font-size: 14px; 
    position: absolute;
    outline: none;
    color: ${colors.black};
    &::placeholder {
      color: ${colors.gray}
    }
  }
  img {
    position: absolute;
    top: 50%;
    left: 24px;
    transform: translateY(-50%);
    z-index: 9;
    width: 16px;
    height: 16px;
  }
`
;