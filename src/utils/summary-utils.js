export const getPropertySum = (sales, key) => {
    let sum = 0;

    for (const sale of sales) {
        sum += sale[key]
    }
    return sum
}


/**
 * Segreguje listę sprzedaży według dnia
 * @param {Array} sales - lista sprzedaży
 */
export const groupSalesByDate = (sales) => {
    const groupedSales = sales.reduce((groups, sale) => {
        const date = sale.data

        if (!groups[date]) {
            groups[date] = []
        }

        groups[date].push(sale);
        return groups
    }, {});

    return groupedSales;
}

export const getSummary = (groupedSales) => {
    console.log(groupedSales)
    const groupArrays = Object.keys(groupedSales).map((date) => {
        return {
            data: date,
            kwotaDlaKomitenta: getPropertySum(groupedSales[date], 'kwotaDlaKomitenta'),
            prowizja: getPropertySum(groupedSales[date], 'marza'),
        };
    });

    return groupArrays
}
