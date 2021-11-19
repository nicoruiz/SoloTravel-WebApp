const checkValidAttr = (attr, setShowErrorFunc) => {
    const isValidAttr = attr !== "";
    setShowErrorFunc(!isValidAttr);

    return isValidAttr;
}

const checkValidPrice = (price, setShowErrorFunc) => {
    const isValidPrice = price !== "" && price < 999999 && price > 0;
    setShowErrorFunc(!isValidPrice);

    return isValidPrice;
}

export { checkValidAttr, checkValidPrice }