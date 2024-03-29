/**
 * Zamienia indeks miesiąca na czytelną dla człowieka nazwę
 * @param {number} index - numer miesiąca np. 05
 * @returns {string} - nazwa miesiąca
 */
export const monthIndexToString = (index) => {
    const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec',
        'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']

    return months[index]
}

const monthDict = {
    '01': 'styczeń',
    '02': 'luty',
    '03': 'marzec',
    '04': 'kwiecień',
    '05': 'maj',
    '06': 'czerwiec',
    '07': 'lipiec',
    '08': 'sierpień',
    '09': 'wrzesień',
    '10': 'październik',
    '11': 'listopad',
    '12': 'grudzień'
}


/**
 * Zamienia rok i miesiąc na czytelną dla człowieka nazwę
 * @param {string} yearAndMonth - rok i miesiąc w formacie: yyyy-mm
 * @returns data w czytelnym formacie np. lipiec 2022
 */
export const yearAndMonthToString = (yearAndMonth) => {
    const year = yearAndMonth.split('-')[0]
    const month = yearAndMonth.split('-')[1]

    const monthStr = monthDict[month.toString()]

    return monthStr + " " + year.toString()
}

/**
 * Zamienia datę w formacie yyyy-mm-dd na czytelną dla człowieka nazwę
 * @param {Date} date - data w formacie yyyy-mm-dd
 * @returns data w czytelnym formacie np. 6 lipiec 2022
 */
export const fullDateToString = (date) => {
    date = date.toString()

    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]

    const monthStr = monthDict[month.toString()]

    return day + " " + monthStr + " " + year.toString()
}

/**
 * Zwraca dzień z daty w formacie yyyy-mm-dd
 * @param {Date} date - data w formacie yyyy-mm-dd
 * @returns data dd
 */
export const extractDay = (date) => {
    const day = date.split('-')[2]
    return day
}


/**
 *
 * @param {Date} date
 * @returns {string} data w formacie yyyy-mm-dd
 */
export const formatDateToYyyyMmDd = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;
    return date
}

export const getToday = () => {
    var today = new Date();
    return formatDateToYyyyMmDd(today);
}