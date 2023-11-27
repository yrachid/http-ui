import { useState } from "react";
import "./App.css";
import { StatusBar } from "./StatusBar";
import { Alert, AlertsContext, createAlertStore } from "./AlertsContext";
import { RequestContextProvider } from "./RequestContext";
import { RequestPage } from "./RequestPage";

function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const store = createAlertStore({ alerts, setAlerts });

  return (
    <div id="App">
      <AlertsContext.Provider value={store}>
        <RequestContextProvider>
          <RequestPage />
        </RequestContextProvider>
        <StatusBar />
      </AlertsContext.Provider>
    </div>
  );
}

export default App;
