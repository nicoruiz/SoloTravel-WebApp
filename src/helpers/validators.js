const checkValidAttr = (attr, setShowErrorFunc) => {
    const isValidAttr = attr !== "";
    setShowErrorFunc(!isValidAttr);

    return isValidAttr;
}

const checkValidNumber = (price, maxValue, setShowErrorFunc) => {
    const isValidNumber = price !== "" && price > 0 && price <= maxValue;
    setShowErrorFunc(!isValidNumber);

    return isValidNumber;
}

const checkValidAttrWithRange = (attr, minLength, maxLength, setShowErrorFunc) => {
    const isValidAttr = attr !== "" 
                     && attr.length >= minLength 
                     && attr.length <= maxLength;
    setShowErrorFunc(!isValidAttr);

    return isValidAttr;
}

export { checkValidAttr, checkValidNumber, checkValidAttrWithRange }