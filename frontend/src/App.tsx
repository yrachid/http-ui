import { useState } from "react";
import "./App.css";
import { Get } from "../wailsjs/go/main/App";
import { UrlBar } from "./UrlBar";
import { RequestEditor } from "./RequestEditor";
import styled from "styled-components";
import { AlertProps, StatusBar } from "./StatusBar";

type LastResponse =
  | null
  | { successful: true; body: string }
  | { successful: false; error: string };

function App() {
  const [lastResponse, setLastResponse] = useState<LastResponse>(null);

  function sendGetRequest(url: string) {
    Get(url)
      .then((data) => {
        setLastResponse({ successful: true, body: data });
      })
      .catch((err) => {
        setLastResponse({ successful: false, error: err });
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

  const converLastResponseToAlerts = (): AlertProps[] =>
    !lastResponse || lastResponse.successful
      ? []
      : [
          {
            type: "danger",
            message: lastResponse.error,
          },
        ];

  return (
    <div id="App">
      <UrlBar onSend={sendGetRequest} />
      <RequestEditor />
      <ResponsePreview lastResponse={lastResponse} />
      <StatusBar alerts={converLastResponseToAlerts()} />
    </div>
  );
}

export default App;
