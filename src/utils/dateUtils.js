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