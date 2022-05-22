import { useState } from 'react';
import DataTable from './components/DataTable';

function App() {
  const [version, setVersion] = useState(0)

  return (
    <div>
      <button onClick={() => window.api.greet("hello from the renderer process")}>Greet</button>
      <button onClick={async () => {
        await window.api.GetVersion()
          .then(res => setVersion(res))
      }}>Get Version</button>
      <p>{version}</p>
      <DataTable />
    </div>
  );
}

export default App;
