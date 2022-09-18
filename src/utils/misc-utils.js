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

/**
 * Sprawdź, czy przedmiot został cakowicie wyprzedany
 * @param {Object} item - przedmiot, który sprawdzamy
 * @returns {boolean} - czy przedmiot jest jeszcze na stanie
 */
export const checkIfSoldOut = (item) => {
    const initAmount = item.przyjetaIlosc
    const soldAmount = item.sprzedanaIlosc
    const returnedAmount = item.zwroconaIlosc

    const remainingAmount = initAmount - soldAmount - returnedAmount

    return remainingAmount <= 0
}

/**
 * Sprawdź, czy na stanie zostało więcej niż ilość amount danego przedmiotu
 * @param {Object} item - przedmiot, który sprawdzamy
 * @param {Number} amount - ilość, wg której chcemy sprawdzić
 * @returns {boolean} - czy na stanie jest więcej lub tyle samo niż amount sztuk przedmiotu item
 */
export const checkIfAmountRemaining = (item, amount) => {
    const initAmount = item.przyjetaIlosc
    const soldAmount = item.sprzedanaIlosc
    const returnedAmount = item.zwroconaIlosc

    const remainingAmount = initAmount - soldAmount - returnedAmount

    return remainingAmount < amount
}

/**
 * Calculates final price of the product
 * @param {Number} commiterValue
 * @param {Number} margin
 * @returns {Number} final price
 */
export const calculatePrice = (commiterValue, margin) => {
    commiterValue = Number.parseFloat(commiterValue)
    margin = Number.parseFloat(margin)

    const price = commiterValue + margin
    return price.toFixed(2)
}