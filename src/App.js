import React, { useState } from 'react';
import PersistentDrawerLeft from './screens/Drawer';
import Notification from './components/Notification';
import Modals from './components/Modals';

import ClientsScreen from './screens/ClientsScreen';
import SalesScreen from './screens/SalesScreen';
import ItemsScreen from './screens/ItemsScreen';
import ContractsScreen from './screens/ContractsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('klienci')
  const [currentContract, setCurrentContract] = useState()

  const openContract = (contract) => {
    setCurrentContract(contract)
    setCurrentScreen('przedmioty')
  }

  const changeScreen = (screen) => {
    setCurrentScreen(screen)
  }

  const renderScreen = (currentScreen) => {
    switch (currentScreen) {
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
      <Notification />
      <PersistentDrawerLeft renderScreen={() => renderScreen(currentScreen)} changeScreen={changeScreen} />

      <Modals />
    </div>
  );
}

export default App;
