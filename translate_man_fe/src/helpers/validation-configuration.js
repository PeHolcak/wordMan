export const WORD = {
  type: "string",
  min: 1,
  max: 50
};

export const LONG_STRING = {
  type: "string",
  min: 1,
  max: 500
};


export const BASIC_STRING = {
  type: "string",
  min: 5,
  max: 25
};

export const VALIDATION_DATA = {
    login: BASIC_STRING,
    firstName: BASIC_STRING,
    lastName: BASIC_STRING,
    password: {
      type: "password",
      min: 10,
      max: 50
    },
    phoneContact: {
      type: "telephone"
    },
    emailContact: {
      type: "email",
      min: 5,
      max: 25
    },
    profilePhoto: {
      type: "base64",
      min: 1,
      max: 2500
    }
  }

export const DEFAULT_VALUE = {
    content: "",
    error: ""
  };
  
export const DEFAULT_PHOTO_VALUE = {
    error: ""
  };