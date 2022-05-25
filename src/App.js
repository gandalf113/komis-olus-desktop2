import { useState } from 'react';
import ClientsScreen from './screens/ClientsScreen';
import ContractsScreen from './screens/ContractsScreen';
import ItemsScreen from './screens/ItemsScreen';
import SalesScreen from './screens/SalesScreen';

function App() {
  const [currentTable, setCurrentTable] = useState('klienci')
  const [currentContract, setCurrentContract] = useState()

  const openContract = (contract) => {
    setCurrentContract(contract)
    setCurrentTable('przedmioty')
  }

  function renderDataTable(currentTable) {
    switch (currentTable) {
      case 'klienci':
        return <ClientsScreen />
      case 'sprzedaz':
        return <SalesScreen />
      case 'umowy':
        return <ContractsScreen openContractCallback={openContract} />
      case 'przedmioty':
        return <ItemsScreen contract={currentContract} />
      default:
        return null
    }
  }

  return (
    <div>
      <button onClick={() => setCurrentTable('klienci')}>Klienci</button>
      <button onClick={() => setCurrentTable('sprzedaz')}>Sprzedaż</button>
      <button onClick={() => setCurrentTable('umowy')}>Umowy</button>
      <br />
      <br />

      {renderDataTable(currentTable)}
      {/* <SalesDataTable /> */}
    </div>
  );
}

export default App;
