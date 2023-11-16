import { useState } from "react";
import "./App.css";
import { Get } from "../wailsjs/go/main/App";
import { UrlBar } from "./UrlBar";
import { RequestEditor } from "./RequestEditor";
import styled from "styled-components";
import { StatusBar } from "./StatusBar";
import { Alert, AlertsContext, createAlertStore } from "./AlertsContext";
import { RequestContextProvider } from "./RequestContext";

type LastResponse =
  | null
  | { successful: true; body: string }
  | { successful: false; error: string };

const ResponsePreview = (props: { lastResponse: LastResponse }) => (
  <ResponsePreviewContainer>
    {props.lastResponse && props.lastResponse.successful && (
      <code>{props.lastResponse.body}</code>
    )}
  </ResponsePreviewContainer>
);

const ResponsePreviewContainer = styled.div`
  display: flex;
`;

function App() {
  const [lastResponse, setLastResponse] = useState<LastResponse>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const store = createAlertStore({ alerts, setAlerts });

  function sendGetRequest(url: string) {
    Get(url)
      .then((data) => {
        setLastResponse({ successful: true, body: data });
      })
      .catch((err) => {
        setLastResponse({ successful: false, error: err });
        store.insertDangerAlert(err);
      });
  }

  return (
    <div id="App">
      <AlertsContext.Provider value={store}>
        <RequestContextProvider>
          <UrlBar onSend={sendGetRequest} />
          <RequestEditor />
          <ResponsePreview lastResponse={lastResponse} />
        </RequestContextProvider>
        <StatusBar />
      </AlertsContext.Provider>
    </div>
  );
}

export default App;
