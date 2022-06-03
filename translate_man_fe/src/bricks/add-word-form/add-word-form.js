import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/loader";
import { LinkContainer } from "react-router-bootstrap";
import CustomForm from "../../bricks/form/custom-form";
import { useTranslation } from "react-i18next";
import {
  WORD,
  LONG_STRING,
  DEFAULT_VALUE,
} from "../../helpers/validation-configuration";
import { stringValidation, passwordValidation } from "../../helpers/validation";
import axios from "axios";

function AddWordForm(props) {
  const { t } = useTranslation();
  const [firstSideWord, setFirstSideWord] = useState(DEFAULT_VALUE);
  const [secondSideWord, setSecondSideWord] = useState(DEFAULT_VALUE);
  const [firstSideWordDescription, setFirstSideWordDescription] =
    useState(DEFAULT_VALUE);
  const [secondSideWordDescription, setSecondSideWordDescription] =
    useState(DEFAULT_VALUE);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo = {} } = userLogin;

  const checkValidationOfAllValues = () => {
    const resultObject = [];
    resultObject.push({
      onChange: setFirstSideWord,
      value: firstSideWord,
      result: stringValidation(firstSideWord.content, WORD.min, WORD.max),
    });
    resultObject.push({
      onChange: setFirstSideWordDescription,
      value: firstSideWordDescription,
      result: stringValidation(
        firstSideWordDescription.content,
        LONG_STRING.min,
        LONG_STRING.max
      ),
    });
    resultObject.push({
      onChange: setSecondSideWordDescription,
      value: secondSideWordDescription,
      result: stringValidation(
        secondSideWordDescription.content,
        LONG_STRING.min,
        LONG_STRING.max
      ),
    });
    resultObject.push({
      onChange: setSecondSideWord,
      value: secondSideWord,
      result: stringValidation(secondSideWord.content, WORD.min, WORD.max),
    });

    return resultObject.reduce((result, currObj) => {
      if ((currObj.result || {}).result) {
        return result;
      } else {
        currObj.onChange({
          ...currObj.value,
          error:
            (currObj.result || {}).customMessage ||
            t("validationFaildeMessage.generalError"),
        });
        return false;
      }
    }, true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkValidationOfAllValues()) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setLoading(true);
      axios.post(
        "/api/word/create",
        {
          firstSideWord: firstSideWord.content,
          secondSideWord: secondSideWord.content,
          firstSideWordDescription: firstSideWordDescription.content,
          secondSideWordDescription: secondSideWordDescription.content,
        },
        config
      ).then((data = {}) => {
        if(data.status > 199 && data.status < 300){
          typeof props.done === "function" && props.done();
        }
      }).catch(error => {
        setError(error)
      }).finally(() => setLoading(false));
    } else {
      setError({message:t("addWordForm.validationError")});
    }
  };

  return (
    <>
      {(error) && (
        <Alert variant="danger">
          {(error &&
            (error.status
              ? error.status === 401
                ? t("loginScreen.notAuthorizate")
                : t("loginScreen.error")
              : error.message))}
        </Alert>
      )}
      {loading ? (
        <Loader />
      ) : (
        <CustomForm
          onSubmit={submitHandler}
          header={t("addWordForm.header")}
          buttons={[
            {
              title: t("addWordForm.button"),
              name: "create",
              submittedButton: true,
              execute: submitHandler,
              variant: "primary",
            },
          ]}
          formItems={[
            {
              name: "firstSideWord",
              type: "input",
              title: t("addWordForm.firstSideWord"),
              validation: WORD,
              value: firstSideWord,
              onChange: setFirstSideWord,
            },
            {
              name: "secondSideWord",
              type: "input",
              title: t("addWordForm.secondSideWord"),
              validation: WORD,
              value: secondSideWord,
              onChange: setSecondSideWord,
            },
            {
              name: "firstSideWordDescription",
              type: "input",
              as: "textarea",
              title: t("addWordForm.firstSideWordDescription"),
              validation: LONG_STRING,
              value: firstSideWordDescription,
              onChange: setFirstSideWordDescription,
            },
            {
              name: "secondSideWordDescription",
              type: "input",
              as: "textarea",
              title: t("addWordForm.secondSideWordDescription"),
              validation: LONG_STRING,
              value: secondSideWordDescription,
              onChange: setSecondSideWordDescription,
            },
          ]}
        >
        </CustomForm>
      )}
    </>
  );
}

export default AddWordForm;
