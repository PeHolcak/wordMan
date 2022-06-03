import i18n from "../i18n";

const VALID_OBJECT = {
    result: true,
    customMessage: ""
}

const NON_VALID_BASIC_OBJECT = {
    result: false,
    customMessage: ""
}

const isValid = (regex, value) => {
    // const reg = new RegExp(regex, "gi");
    // const a = reg.test(value);
    return regex ? new RegExp(regex, "gi").test(value) : false;
};


export const isValueString = (value) => {
    return typeof value === "string";
};

export const stringValidation = (value, min, max) => {
    if(max && !min){
        return isValid(`^\\w{0,${max}}$`, value) ? VALID_OBJECT : {...NON_VALID_BASIC_OBJECT, customMessage: (i18n.t("validationFaildeMessage.stringMaxCondition")||"").replace("${min}",min).replace("${max}",max)};  
    }else if(!max && !min){
        return isValueString(value) ? VALID_OBJECT : {...NON_VALID_BASIC_OBJECT, customMessage: (i18n.t("validationFaildeMessage.stringCondition")||"").replace("${min}",min).replace("${max}",max)};  
    }else if(!max && min){
        return isValid(`^\\w{${min},}$`, value) ? VALID_OBJECT : {...NON_VALID_BASIC_OBJECT, customMessage: (i18n.t("validationFaildeMessage.stringMinCondition")||"").replace("${min}",min).replace("${max}",max)};   
    }else{
       
        return isValid(`^\\w{${min},${max}}$`, value) ? VALID_OBJECT : {...NON_VALID_BASIC_OBJECT, customMessage: (i18n.t("validationFaildeMessage.stringMinMaxCondition")||"").replace("${min}",min).replace("${max}",max)};
    }
};

export const notCompleteTelephoneValidation = (value, min, max) => {
    //+420 568 698 456, +1 265 656 133, 735 656 987
    //Telefonní číslo musí být ve formátu: +420 568 698 456, +1 265 656 133, 735 656 987
    return isValid(`^(\\+?\\d{0,3}?\\s?)?(\\d{0,3}\\s?){0,3}$`, value) ? VALID_OBJECT : {    
        result: false,
        customMessage: i18n.t("validationFaildeMessage.telephone")};
};

export const telephoneValidation = (value, min, max) => {
    //+420 568 698 456, +1 265 656 133, 735 656 987
    return isValid(`^(\\+\\d{1,3}\\s?)?(\\d{3}\\s?){2}(\\d{3})$`, value)? VALID_OBJECT : {    
        result: false,
        customMessage: i18n.t("validationFaildeMessage.telephone")};
};


export const passwordValidation = (value, min, max) => {
        // return isValid(`^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*#?&])..{${min},${max}}$`, value)? VALID_OBJECT : {    
        //     result: false,
        //     customMessage: "Heslo musí obsahovat velká i malá písmena, čísla a jede z techto znaků @$!%*#?&"};
        // };
        return isValid(`^(?=.*[a-zA-Z])(?=.*\\d).{${min},${max}}$`, value) ? VALID_OBJECT : {...NON_VALID_BASIC_OBJECT, customMessage:  (i18n.t("validationFaildeMessage.password")||"").replace("${min}",min).replace("${max}",max)};
};

export const emailValidation = (value) => {
    //return isValid(`^\(A-Z|a-z)+$`, value);
    //return isValid(`^\\(?=.*@)$`, value) ? VALID_OBJECT : { 

        // return isValid(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`, value) ? VALID_OBJECT : { 
        // result: false,
        // customMessage: "Email musí obsahovat @"};

        return isValid(`^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,3}$`, value) ? VALID_OBJECT : { 
            result: false,
            customMessage: i18n.t("validationFaildeMessage.emailCondition")||""};
};

export const notCompleteEmailValidation = (value) => {
    //return isValid(`^\(A-Z|a-z)+$`, value);
    //return isValid(`^\\(?=.*@)$`, value) ? VALID_OBJECT : { 

        // return isValid(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`, value) ? VALID_OBJECT : { 
        // result: false,
        // customMessage: "Email musí obsahovat @"};

        return isValid(`^[A-Z0-9._%+-]+?@?[A-Z0-9.-]+?\.[A-Z]{2,3}?$`, value) ? VALID_OBJECT : { 
            result: false,
            customMessage: i18n.t("validationFaildeMessage.emailCondition")||""};
};

export const base64Validation = (value, min, max) => {
    // if(!isValid(`^(data:image/)(jpeg|png);base64`, value)){
    //     return false;
    // }
    if(value){
        const regex = new RegExp("^(data:image/)(jpeg|png);base64", "gi");
        const headerLength = ((value.match(regex)||[])[0]||"").length;

    if(headerLength){
        const base64Length = value.length - headerLength;
        
        const size = ((4 *Math.ceil((base64Length/3))*0.5624896334383812)/1000);

        return ((size >= min) && (size <= max )) ? VALID_OBJECT : {    
            result: false,
            customMessage: (i18n.t("validationFaildeMessage.base64Size")||"").replace("${min}",min).replace("${max}",max)};
    }else{
        return {    
            result: false,
            customMessage: (i18n.t("validationFaildeMessage.base64FileType")||"")};
    }
    }else{
        return {    
            result: false,
            customMessage: (i18n.t("validationFaildeMessage.base64NotFilled")||"")};
     
    }

};