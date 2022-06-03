import React,{useEffect, useState}from 'react'
import { Col, Container, Row, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import {useTranslation} from "react-i18next";

function ProfileScreen() {
    const [ userDetail, setUserDetail] = useState({});
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo = {} } = userLogin;
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const config = {
            headers: {
              'Content-Type': 'application/json',   
              Authorization: `Bearer ${(userInfo.data||{}).token}`,
            },
          }

        axios.get(`/api/user/detail?userId=${(userInfo.data||{})._id}` , config).then(res=> {
            setUserDetail((res||{}).data)
        });
   }, []);

   const changeLanguage = (language) => {
    console.log(t, i18n, language);
    i18n.changeLanguage(language.target.value);
  };

   const setData=(data)=>{
    setUserDetail(data);
   }


    return (
        <Container>
            <Row>
                <Col>
                    <Card className="my-3">
                        <Card.Body>
                            <Row>
                                <Col xs="12" sm="4" l="3"><ProfileImage src={userInfo.profilePhoto} rounded/></Col>
                                <Col xs="12" sm="8" l="9">
                                    <h1>{`${userDetail.firstName} ${userDetail.lastName}`}</h1>
                                    <h4>{t("profileScreen.email")}</h4> {userDetail.emailContact} 
                                    <h4>{t("profileScreen.phone")}</h4> {userDetail.phoneContact}    
                                    <h4>{t("profileScreen.login")}</h4> {userDetail.login} 
                                    <h4>{t("profileScreen.userCreateData")}</h4> {new Date(userDetail.year||0).toISOString().slice(0,10)}
                                    <h4>{t("profileScreen.role")}</h4> {(userDetail.role||{}).roleName} 
                                    <h4>{t("profileScreen.role")}</h4> {(userDetail.role||{}).roleDesc} 
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
            </Row>
        </Container>
    )
}

export default ProfileScreen;

const ProfileImage = styled(Image)`
    width: 100%;
`;

