import { useState } from 'react';
import { ClientDataTable, SalesDataTable } from './components/DataTable';
import ClientsScreen from './screens/ClientsScreen';
import ContractsScreen from './screens/ContractsScreen';
import SalesScreen from './screens/SalesScreen';

function App() {
  const [currentTable, setCurrentTable] = useState('klienci')


  function renderDataTable(currentTable) {
    switch (currentTable) {
      case 'klienci':
        return <ClientsScreen />
      // return <ClientDataTable />
      case 'sprzedaz':
        return <SalesScreen />
      case 'umowy':
        return <ContractsScreen />
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
