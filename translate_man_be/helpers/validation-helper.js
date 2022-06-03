import getError from "../utils/get-error.js";

export const isnotEmptyArray = (value) => value && Array.isArray(value) && value.length;
export const isNotEmptyObject = (value) => !!(value && typeof value === "object" && Object.entries(value).length);
export const isFunction = (value) => (typeof value === "function");

export const isDtoInValid = async (scheme, requestBody, res) => {
    if(await scheme.isValid(requestBody)){
        return true;
    }else{
        await getError("general-errors", "wrongDtoIn", res);
        return false;
    }
};

export const checkUnsupportedKeyes = (dtoIn, validatorObject) => {
    const validationFields = validatorObject.fields;
    const dtoInKeyes = (isNotEmptyObject(dtoIn) && Object.keys(dtoIn))||[];
    return dtoInKeyes.reduce((cathedUnsupportedKeyes, nextKey) => {
        if(!validationFields[nextKey]){
            cathedUnsupportedKeyes.push(nextKey);
        }
        return cathedUnsupportedKeyes;
    }, []);
};