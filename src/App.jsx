import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Nav from './components/nav';
import { DataContextProvider } from './services/mqttdata';

function App() {
  return (
    <DataContextProvider> {/* Envolvendo toda a aplicação com o DataContextProvider */}
      <Router>
        <div className="w-full h-full overflow-hidden">
          <Nav />
          <AppRoutes />
        </div>
      </Router>
    </DataContextProvider>
  );
}

export default App;
