import React from 'react';
import { useSelector } from 'react-redux';
import PersistentDrawerLeft from './screens/Drawer';
import Notification from './components/Notification';
import Modals from './components/Modals';

import ClientsScreen from './screens/ClientsScreen';
import SalesScreen from './screens/SalesScreen';
import SalesDetailScreen from './screens/SalesDetailScreen';
import ContractDetailScreen from './screens/ContractDetailScreen';
import ContractsScreen from './screens/ContractsScreen';
import SalesSummaryScreen from './screens/SalesSummaryScreen';
import { HashRouter } from 'react-router-dom';
import SalesProvider from './context/sales-context';
import ContractProvider from './context/contract-context';
import ClientProvider from './context/client-context';

function App() {
  // Redux
  const { currentScreen } = useSelector(state => state.screen)

  const renderScreen = (currentScreen) => {
    switch (currentScreen) {
      case 'klienci':
        return <ClientsScreen />
      case 'dni_sprzedazy':
        return <SalesScreen />
      case 'sprzedaz':
        return <SalesDetailScreen />
      case 'podsumowanie_sprzedazy':
        return <SalesSummaryScreen />
      case 'umowy':
        return <ContractsScreen />
      case 'przedmioty':
        return <ContractDetailScreen />
      default:
        return null
    }
  }

  return (
    <div>
      <Notification />
      <ClientProvider>
        <SalesProvider>
          <ContractProvider>

            <HashRouter>
              <PersistentDrawerLeft renderScreen={() => renderScreen(currentScreen)} />
              <Modals />
            </HashRouter>

          </ContractProvider>
        </SalesProvider>
      </ClientProvider>
    </div>
  );
}

export default App;
