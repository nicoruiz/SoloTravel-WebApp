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

export { checkValidAttr, checkValidNumber }