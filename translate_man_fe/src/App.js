import React, {useRef} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './bricks/navbar/custom-navbar';
import Footer from './bricks/footer/footer';
import HomeScreen from './screens/home-screen';
import LoginScreen from './screens/login-screen';
import RegisterScreen from "./screens/register-screen";
import { useSelector } from 'react-redux';
import PrivateRoute from './hoc/private-route';
import ProfileScreen from './screens/profile-screen';
import NonPrivateRoute from "./hoc/non-private-route";
import PublicRoute from "./hoc/public-route";
import Words from './screens/words-screen';
import styles from "./app.module.css";
import { Modal } from './bricks/modal/modal';


const App = () => {
  const isLogged = Boolean((useSelector((state) => state.userLogin)||{}).userInfo);
  const modalRef = useRef(null);
  const homeScreenRef = useRef(null);
  const _openModal = (content) => {
    modalRef.current.showModal(content);
  };

  const _refreshHomeScreen = () => {
    homeScreenRef.current.refreh();
    modalRef.current.closeModal();
  };

  return (
    <Router>
        <div className={styles.pageWrapper}>
        <Navbar openModal={_openModal} refreshHomeScreen={_refreshHomeScreen}/>
        <Modal ref={modalRef}/>
        <Container className={styles.contentContainer}>
          <NonPrivateRoute name="login" isLogged={isLogged} path='/login' component={LoginScreen} />
          <NonPrivateRoute name="register" isLogged={isLogged} path='/register' component={RegisterScreen} />
          <PublicRoute name="home" isLogged={isLogged} path='/home' component={() => <HomeScreen openModal={_openModal} ref={homeScreenRef}/>} exact/>
          <PrivateRoute name="profile" isLogged={isLogged} path='/profile' component={ProfileScreen} exact/>
       </Container>
      <Footer />
      </div>
    </Router>
  )
}

export default App
