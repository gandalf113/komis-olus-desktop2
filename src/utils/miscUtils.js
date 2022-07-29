/**
 * Zamienia liczbę z systemu dziesiętnego na szesnastkowy
 * @param {number} dec - liczba w systemie dziesiętnym
 * @returns {string} - liczba w systemie szesnastkowym
 */
export const decToHex = (dec) => {
    let hexStr = dec.toString(16);
    return hexStr
}

/**
 * Zamienia wartość liczbową na cenę
 * @param {number} value - liczba do przekonwertowania
 * @returns {string} - liczba w formacie cenowym
 */
export const toCurrency = (value) => {
    let price = parseFloat(value);
    return price.toFixed(2) + " zł"
}
