import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../bricks/loader/loader';
import { LinkContainer } from 'react-router-bootstrap';
import { loginFunc } from '../actions/user-action';
import CustomForm from "../bricks/form/custom-form";
import {useTranslation} from "react-i18next";
import { VALIDATION_DATA, DEFAULT_VALUE } from "../helpers/validation-configuration";
import { stringValidation, passwordValidation} from "../helpers/validation";

function LoginScreen() {
    const { t } = useTranslation();
    const [login, setLogin] = useState(DEFAULT_VALUE);
    const [password, setPassword] = useState(DEFAULT_VALUE);
    const [localError, setLocalError] = useState("");
  
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error } = userLogin;
  
  const checkValidationOfAllValues = () => {
    const resultObject = [];
    resultObject.push({
      onChange: setLogin,
      value: login,
      result: stringValidation(login.content, VALIDATION_DATA.login.min, VALIDATION_DATA.login.max)
    });
    resultObject.push({
      onChange: setPassword,
      value: password,
      result: passwordValidation(password.content, VALIDATION_DATA.password.min, VALIDATION_DATA.password.max)
    });


    return resultObject.reduce((result, currObj) => {
      if((currObj.result||{}).result){
        return result;
      }else{
        currObj.onChange({...currObj.value,error:((currObj.result||{}).customMessage||t("validationFaildeMessage.generalError"))});
        return false;
      }
    }, true);

  };

    const submitHandler = (e) => {
      e.preventDefault();
      if (checkValidationOfAllValues()) {
        dispatch(loginFunc(login.content, password.content));
       } else {
        setLocalError(t("registerScreen.sendValueError"));
      }
    };
    return (<>
      {((error && error.message) || localError ) && <Alert variant="danger">{(error && (error.status ? error.status === 401 ? t("loginScreen.notAuthorizate") : t("loginScreen.error") : error.message)) || localError}</Alert>}
      {loading ? <Loader />:(
      <CustomForm onSubmit={submitHandler} header={t("loginScreen.header")} buttons={[{title:t("loginScreen.submitButton"), name:"login", submittedButton: true, execute: submitHandler, variant:"primary"}]} formItems={[
        {name:"login", type:"input", title:t("loginScreen.login"), placeholder:t("loginScreen.loginPlaceholder"), validation: VALIDATION_DATA.login, value:login, onChange: setLogin}, 
        {name:"password",type:"password", title:t("loginScreen.password"), placeholder:t("loginScreen.passwordPlaceholder"), validation: VALIDATION_DATA.password,  value:password, onChange: setPassword}
    ]}>
      <Row className='pt-3'>
        <Col>
          {t("loginScreen.newStudent")}{' '}
          <LinkContainer to='/register'>
            <Link href="#">{t("loginScreen.register")}</Link>
          </LinkContainer>
          {' '} {t("loginScreen.fillIn")}
        </Col>
      </Row>
      </CustomForm>)}
    </>);

}

export default LoginScreen;
