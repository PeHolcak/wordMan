import React, { useState, useEffect } from 'react';
import CustomForm from "../bricks/form/custom-form";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/user-action';
import { Alert } from 'react-bootstrap';
import Loader from '../bricks/loader/loader';
import { useTranslation } from "react-i18next";
import { stringValidation, emailValidation, passwordValidation, telephoneValidation, base64Validation } from "../helpers/validation";
import { VALIDATION_DATA, DEFAULT_VALUE, DEFAULT_PHOTO_VALUE } from "../helpers/validation-configuration";


function RegisterScreen() {
  const [login, setLogin] = useState(DEFAULT_VALUE);
  const [firstName, setFirstName] = useState(DEFAULT_VALUE);
  const [lastName, setLastName] = useState(DEFAULT_VALUE);
  const [password, setPassword] = useState(DEFAULT_VALUE);
  const [phoneContact, setPhoneContact] = useState(DEFAULT_VALUE);
  const [emailContact, setEmailContact] = useState(DEFAULT_VALUE);
  const [profilePhoto, setProfilePhoto] = useState(DEFAULT_PHOTO_VALUE);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // useEffect(() => {
  //   document.title = "UUwordMan - register"
  // }, []);

  const checkValidationOfAllValues = () => {
    const resultObject = [];
    resultObject.push({
      onChange: setLogin,
      value: login,
      result: stringValidation(login.content, VALIDATION_DATA.login.min, VALIDATION_DATA.login.max)
    });
    resultObject.push({
      onChange: setFirstName,
      value: firstName,
      result: stringValidation(firstName.content, VALIDATION_DATA.firstName.min, VALIDATION_DATA.firstName.max)
    });
    resultObject.push({
      onChange: setLastName,
      value: lastName,
      result: stringValidation(lastName.content, VALIDATION_DATA.lastName.min, VALIDATION_DATA.lastName.max)
    });
    resultObject.push({
      onChange: setPassword,
      value: password,
      result: passwordValidation(password.content, VALIDATION_DATA.password.min, VALIDATION_DATA.password.max)
    });
    resultObject.push({
      onChange: setPhoneContact,
      value: phoneContact,
      result: telephoneValidation(phoneContact.content, VALIDATION_DATA.phoneContact.min, VALIDATION_DATA.phoneContact.max)
    });
    resultObject.push({
      onChange: setEmailContact,
      value: emailContact,
      result: emailValidation(emailContact.content, VALIDATION_DATA.emailContact.min, VALIDATION_DATA.emailContact.max)
    });
    resultObject.push({
      onChange: setProfilePhoto,
      value: profilePhoto,
      result: base64Validation(profilePhoto.content, VALIDATION_DATA.profilePhoto.min, VALIDATION_DATA.profilePhoto.max)
    });

    return resultObject.reduce((result, currObj) => {
      if((currObj.result||{}).result){
        return result;
      }else{
        currObj.onChange({...currObj.value,error:((currObj.result||{}).customMessage||t("validationFaildeMessage.generalError"))});
        return false;
      }
    }, true);


    // if (!firstNameValidationResult.result) {
    //   isFullValid = false;
    //   setLogin();
    // }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkValidationOfAllValues()) {
      dispatch(register(firstName.content, lastName.content, login.content, password.content, phoneContact.content, emailContact.content, profilePhoto.content));
    } else {
      setLocalError(t("registerScreen.sendValueError"));
    }
  };

  const clearValues = () => {
    setProfilePhoto(DEFAULT_PHOTO_VALUE);
    setEmailContact(DEFAULT_VALUE);
    setPhoneContact(DEFAULT_VALUE);
    setPassword(DEFAULT_VALUE);
    setLastName(DEFAULT_VALUE);
    setFirstName(DEFAULT_VALUE);
    setLogin(DEFAULT_VALUE);
    setLocalError("");
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  return (
    <>
      {( error || localError ) && <Alert variant="danger">{error || localError}</Alert>}
      {loading ? <Loader /> :
        <CustomForm onSubmit={submitHandler} header={t("registerScreen.header")} buttons={[{ title: t("registerScreen.submitButton"), name: "register", submittedButton: true, execute: submitHandler, variant: "primary" }, { title: t("registerScreen.clearButton"), name: "clear", execute: clearValues, variant: "danger" }]} formItems={[
          { name: "login", type: "input", title: t("registerScreen.login"), placeholder: t("registerScreen.loginPlaceholder"), validation: VALIDATION_DATA.login, value: login, onChange: setLogin },
          { name: "firstName", type: "input", title: t("registerScreen.firstName"), placeholder: t("registerScreen.firstNamePlaceholder"), validation: VALIDATION_DATA.firstName, value: firstName, onChange: setFirstName },
          { name: "lastName", type: "input", title: t("registerScreen.lastName"), placeholder: t("registerScreen.lastNamePlaceholder"), validation: VALIDATION_DATA.lastName, value: lastName, onChange: setLastName },
          { name: "password", type: "password", title: t("registerScreen.password"), placeholder: t("registerScreen.passwordPlaceholder"), validation: VALIDATION_DATA.password, value: password, onChange: setPassword },
          { name: "phoneContact", type: "input", title: t("registerScreen.phoneContact"), placeholder: t("registerScreen.phoneContactPlaceholder"), validation: VALIDATION_DATA.phoneContact, value: phoneContact, onChange: setPhoneContact },
          { name: "emailContact", type: "input", title: t("registerScreen.emailContact"), placeholder: t("registerScreen.emailContactPlaceholder"), validation: VALIDATION_DATA.emailContact, value: emailContact, onChange: setEmailContact },
          { name: "profilePhoto", type: "photo", title: t("registerScreen.profilePhoto"), placeholder: t("registerScreen.profilePhotoPlaceholder"), validation: VALIDATION_DATA.profilePhoto, value: profilePhoto, onChange: setProfilePhoto },
        ]} />}</>
  )
}

export default RegisterScreen;
