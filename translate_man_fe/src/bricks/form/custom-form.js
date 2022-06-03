import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import styles from "./custom-form.module.css";
import FileBase64 from "react-file-base64";
import { stringValidation, notCompleteTelephoneValidation, base64Validation } from "../../helpers/validation";
import { useTranslation } from "react-i18next";


const SKIP_VALIDATION_FUNC = () => { return { result: true } };

function CustomForm(props) {
  const { t } = useTranslation();

  const validateBeforeChange = (onchange, newContent, oldValue, validation = {}, name) => {
    let validateFunc = stringValidation;
    switch (validation.type) {
      case "string":
        validateFunc = stringValidation;
        break;
      case "password":
        validateFunc = stringValidation;
        break;
      case "telephone":
        validateFunc = notCompleteTelephoneValidation;
        break;
      case "email":
        validateFunc = SKIP_VALIDATION_FUNC;
        break;
      case "base64":
        validateFunc = base64Validation;
        break;
      default:
        validateFunc = SKIP_VALIDATION_FUNC;
        break;
    }
    //validateFunc(value, validation.min, validation.max) ? onchange(value) : setError(t("registerScreen.InputValueError").replace("${inputName}",name).replace("${min}",validation.min).replace("${max}",validation.max));
    const copyValue = { ...oldValue };
    const validationResult = (validateFunc(newContent, 0, validation.max) || {});
    if (validationResult.result) {
      copyValue.content = newContent;
      copyValue.error = "";
      onchange(copyValue);
    } else {
      copyValue.error = validationResult.customMessage || t("registerScreen.inputValueError").replace("${inputName}", name).replace("${min}", validation.min).replace("${max}", validation.max);
      onchange(copyValue);
    }

  };



  const _getFormItem = (formItem) => {
    switch (formItem.type) {
      case "photo":
        return (
          <div>
            <Row>
              <Col>
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => validateBeforeChange(formItem.onChange, base64, formItem.value, formItem.validation, formItem.name)}
                />
              </Col>
              <Col></Col>
            </Row>
            {(formItem.value || {}).content && (!(formItem.value || {}).error) && (
              <div>
                {/* <button
                onClick={() => formItem.onChange("")}
                className={styles.deleteImage}
              >
                <XCircle />
              </button> */}
                <img
                  style={{ width: "100%", height: "auto" }}
                  src={(formItem.value || {}).content}
                />
              </div>
            )}
            {(formItem.value || {}).error && <p>{(formItem.value || {}).error}</p>}
          </div>
        );
      default: return (
        <InputGroup hasValidation>
          <Form.Control
            required isInvalid={formItem.value.error}
            type={formItem.type}
            placeholder={formItem.placeholder}
            value={formItem.value.content}
            as={formItem.as}
            onChange={(e) => validateBeforeChange(formItem.onChange, e.target.value, formItem.value, formItem.validation, formItem.name)}
          />
          <Form.Control.Feedback type="invalid">
            {formItem.value.error}
          </Form.Control.Feedback>
        </InputGroup>
      )
    }
  };

return (
  <div className={styles.formWrapper}>
    <div className={styles.formContainer}>
      <h1>{props.header}</h1>
      <Form onSubmit={props.onSubmit}>
        {props.formItems.map((formItem) => (
          <Form.Group controlId={formItem.name}>
            <Form.Label className={styles.label}>{formItem.title}</Form.Label>
            {_getFormItem(formItem)}
          </Form.Group>
        ))}
        <div className={styles.buttonWrapper}>
          {props.buttons &&
            props.buttons.map((button) => (
              <Button
                type={button.submittedButton && "submit"}
                className={styles.formButton}
                onClick={button.execute}
                variant={button.variant}
                key={button.name}
              >
                {button.title}
              </Button>
            ))}
        </div>
      </Form>
      {props.children}
    </div>
  </div>
);
};

export default CustomForm;
