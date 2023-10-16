import { useState } from "react";
import "./App.css";
import { Get } from "../wailsjs/go/main/App";
import { UrlBar } from "./UrlBar";
import { RequestEditor } from "./RequestEditor";
import styled from "styled-components";

function App() {
  type LastResponse =
    | null
    | { successful: true; body: string }
    | { successful: false; error: string };
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
      {props.lastResponse && !props.lastResponse.successful && (
        <code>{props?.lastResponse?.error}</code>
      )}
    </ResponsePreviewContainer>
  );

  return (
    <div id="App">
      <UrlBar onSend={sendGetRequest} />
      <RequestEditor />
      <ResponsePreview lastResponse={lastResponse} />
    </div>
  );
}

export default App;
