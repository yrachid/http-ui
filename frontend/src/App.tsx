import { useState } from "react";
import "./App.css";
import { Get } from "../wailsjs/go/main/App";
import { UrlBar } from "./UrlBar";
import { RequestEditor } from "./RequestEditor";
import styled from "styled-components";
import { StatusBar } from "./StatusBar";
import { Alert, AlertsContext } from "./AlertsContext";

type LastResponse =
  | null
  | { successful: true; body: string }
  | { successful: false; error: string };

function App() {
  const [lastResponse, setLastResponse] = useState<LastResponse>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  function sendGetRequest(url: string) {
    Get(url)
      .then((data) => {
        setLastResponse({ successful: true, body: data });
      })
      .catch((err) => {
        setLastResponse({ successful: false, error: err });
        setAlerts([
          ...alerts,
          {
            id: 1,
            type: "danger",
            text: err,
          },
        ]);
      });
  }

  const ResponsePreviewContainer = styled.div`
    display: flex;
  `;

  const ResponsePreview = (props: { lastResponse: LastResponse }) => (
    <ResponsePreviewContainer>
      {props.lastResponse && props.lastResponse.successful && (
        <code>{props.lastResponse.body}</code>
      )}
    </ResponsePreviewContainer>
  );

  return (
    <div id="App">
      <AlertsContext.Provider value={alerts}>
        <UrlBar onSend={sendGetRequest} />
        <RequestEditor />
        <ResponsePreview lastResponse={lastResponse} />
        <StatusBar alerts={alerts}/>
      </AlertsContext.Provider>
    </div>
  );
}

export default App;
