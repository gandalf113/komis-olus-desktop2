import React from 'react';
import { useSelector } from 'react-redux';
import PersistentDrawerLeft from './screens/Drawer';
import Notification from './components/Notification';
import Modals from './components/Modals';

import ClientsScreen from './screens/ClientsScreen';
import SalesScreen from './screens/SalesScreen';
import ContractDetailScreen from './screens/ContractDetailScreen';
import ContractsScreen from './screens/ContractsScreen';

function App() {
  // Redux
  const { currentScreen } = useSelector(state => state.screen)

  const renderScreen = (currentScreen) => {
    switch (currentScreen) {
      case 'klienci':
        return <ClientsScreen />
      case 'sprzedaz':
        return <SalesScreen />
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
