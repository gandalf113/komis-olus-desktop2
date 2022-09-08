import React from 'react';
import { HashRouter } from 'react-router-dom';
import PersistentDrawerLeft from './screens/Drawer';
import Notification from './components/Notification';
import Modals from './components/Modals';

import SalesProvider from './context/sales-context';
import ContractProvider from './context/contract-context';
import ClientProvider from './context/client-context';
import WithdrawProvider from './context/withdraw-context';
import ReturnsProvider from './context/return-context';

function App() {
  return (
    <div>
      <Notification />
      <ClientProvider>
        <SalesProvider>
          <ContractProvider>
            <WithdrawProvider>
              <ReturnsProvider>


                <HashRouter>
                  <PersistentDrawerLeft/>
                  <Modals />
                </HashRouter>

              </ReturnsProvider>
            </WithdrawProvider>
          </ContractProvider>
        </SalesProvider>
      </ClientProvider>
    </div>
  );
}

export default App;
