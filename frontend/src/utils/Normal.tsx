import BigNumber from "bignumber.js"

export const formatNumberWithSuffix = (num: number) => {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return num.toString();
    }
}

export const localizedNumber = (value: string | number, decimals = 2, locale = 'en-US') => {
    // Convert BigNumber to a string for formatting
    const formattedNumber = new Intl.NumberFormat(locale, {
        maximumFractionDigits: decimals, // Customize as needed
    }).format(new BigNumber(value).toNumber());

    return formattedNumber
}

export const shortenAddress = (address: string | undefined, length = 6) => {
    if (address) {
        if (address.length > 15) {
            return `${address.slice(0, length)}...${address.slice(-length)}`;
        } else {
            return address
        }
    } else {
        return ''
    }
};