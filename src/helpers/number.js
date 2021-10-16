import { DEFAULT_LOCALE } from '../config';

const formatToMoney = value => {
    return value.toLocaleString(DEFAULT_LOCALE);
}

export { formatToMoney };