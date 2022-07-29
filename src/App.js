import React from 'react';
import { useSelector } from 'react-redux';
import PersistentDrawerLeft from './screens/Drawer';
import Notification from './components/Notification';
import Modals from './components/Modals';

import ClientsScreen from './screens/ClientsScreen';
import SalesScreen from './screens/sales/SalesScreen';
import SalesMonthViewScreen from './screens/sales/SalesMonthViewScreen';
import SalesDetailScreen from './screens/sales/SalesDetailScreen';
import ContractDetailScreen from './screens/ContractDetailScreen';
import ContractsScreen from './screens/ContractsScreen';
import SalesSummaryScreen from './screens/sales/SalesDailySummaryScreen';

function App() {
  // Redux
  const { currentScreen } = useSelector(state => state.screen)

  const renderScreen = (currentScreen) => {
    switch (currentScreen) {
      case 'klienci':
        return <ClientsScreen />
      case 'sprzedaz':
        return <SalesScreen />
        case 'sprzedaz_miesiac':
          return <SalesMonthViewScreen />
      case 'sprzedaz_dzien':
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
      <PersistentDrawerLeft renderScreen={() => renderScreen(currentScreen)} />
      <Modals />
    </div>
  );
}

export default App;
