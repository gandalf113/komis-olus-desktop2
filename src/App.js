import { useState } from 'react';
import { ClientDataTable, SalesDataTable } from './components/DataTable';

function App() {
  const [currentTable, setCurrentTable] = useState('klienci')


  function renderDataTable(currentTable) {
    switch (currentTable) {
      case 'klienci':
        return <ClientDataTable />
      case 'sprzedaz':
        return <SalesDataTable />
      default:
        return null
    }
  }

  return (
    <div>
      <button onClick={() => setCurrentTable('klienci')}>Klienci</button>
      <button onClick={() => setCurrentTable('sprzedaz')}>Sprzedaż</button>
      <button>Umowy</button>
      <button>Przedmioty</button>
      <br />
      <br />

      {renderDataTable(currentTable)}
      {/* <SalesDataTable /> */}
    </div>
  );
}

export default App;
