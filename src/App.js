import * as React from 'react';
import PersistentDrawerLeft from './screens/Drawer';
import Notification from './components/Notification';

function App() {
  return (
    <div>
      <Notification />
      <PersistentDrawerLeft />
    </div>
  );
}

export default App;
