import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Image, Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../../actions/user-action';
import styled from 'styled-components';
import styles from './custom-navbar.module.css';
import {useTranslation} from "react-i18next";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddWordForm from '../add-word-form/add-word-form';

function CustomNavbar({openModal, refreshHomeScreen}) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language.target.value);
  };
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  }

  const openAddWordModal = () => {
    openModal(<AddWordForm done={refreshHomeScreen} />);
  }

  const userInfoData = (userInfo||{}).data; 

    return (
        <Navbar bg="light" expand="lg">
        <Container className={styles.navBarContainer}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
            {userInfo&&<Button onClick={openAddWordModal}>
              <AddCircleIcon/>
            </Button>}
             {/*privatní routy */} 
            <LinkContainer to='/home'><Nav.Link href="#">{t("navbar.routes.home")}</Nav.Link></LinkContainer>
            </Nav>

            {/* výběr jazyka */}
            <select className={styles.select} onChange={changeLanguage}>
              <option value="cs">CZ</option>
              <option value="en">EN</option>
            </select>
            {/* dropdown - uživatel */}
              {userInfo?(<ProfileInfoWrapper><LinkContainer className={styles.imageLink} to='/profile'><ProfileImage src={userInfoData.profilePhoto} className='rounded-circle'rounded /></LinkContainer>
                <NavDropdown title={`${userInfoData.firstName} ${userInfoData.firstName}`} id="basic-nav-dropdown">
                <LinkContainer className={styles.imageLink} to='/profile'><NavDropdown.Item href="#">{t("navbar.profileInfo.profile")}</NavDropdown.Item></LinkContainer>
                <NavDropdown.Item href="#">{t("navbar.profileInfo.requests")}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>{t("navbar.profileInfo.logout")}</NavDropdown.Item>
              </NavDropdown></ProfileInfoWrapper>):<><LinkContainer to='/login'><Nav.Link>{t("navbar.nonLoggedRoutes.login")}</Nav.Link></LinkContainer><LinkContainer to='/register'><Nav.Link>{t("navbar.nonLoggedRoutes.register")}</Nav.Link></LinkContainer></>}
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default CustomNavbar;

const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
`;

const ProfileInfoWrapper = styled.div`
  display:flex;
`;
