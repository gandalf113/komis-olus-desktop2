/**
 * Filtruje sprzedaż wg. roku i miesiąca
 * @param {Array} allSales - cała sprzedaż
 * @param {String} date - rok i miesiąc w formacie yyyy-mm
 * @returns {Array} - sprzedaż dla danego miesiąca danego roku
 */
 export const getMonthlySales = (allSales, date) => {
    const filteredSales = allSales.filter(sale => {
        return sale.data.slice(0, -3) === date
    })

    return filteredSales
}
