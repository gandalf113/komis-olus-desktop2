import { generateContractNumber } from "./ContractModal";

const contracts = [
    {
        id: 1,
        numer_umowy: '1/2022',
        data: '2022-06-31'
    },
    {
        id: 2,
        numer_umowy: '2/2022',
        data: '2022-06-31'
    },
    {
        id: 3,
        numer_umowy: '3/2022',
        data: '2022-07-01'
    },
    {
        id: 4,
        numer_umowy: '4/2022',
        data: '2022-07-02'
    },
    {
        id: 5,
        numer_umowy: '2/2023',
        data: '2023-01-01'
    },
    {
        id: 6,
        numer_umowy: '8/2025',
        data: '2025-01-01'
    },
    {
        id: 7,
        numer_umowy: '9/2025',
        data: '2025-01-02'
    },
]

test('tests generating contract number', () => {
    const contractNum1 = generateContractNumber(contracts, 2022);
    const contractNum2 = generateContractNumber(contracts, 2023);
    const contractNum3 = generateContractNumber(contracts, 2024);
    const contractNum4 = generateContractNumber(contracts, 2025);
    expect(contractNum1).toBe('5/2022');
    expect(contractNum2).toBe('3/2023');
    expect(contractNum3).toBe('1/2024');
    expect(contractNum4).toBe('10/2025');
})