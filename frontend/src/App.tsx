import { useState } from "react";
import "./App.css";
import { Get } from "../wailsjs/go/main/App";
import { UrlBar } from "./UrlBar";
import { RequestEditor } from "./RequestEditor";
import styled from "styled-components";

function App() {
  const [resultText, setResultText] = useState("");
  const updateResultText = (result: string) => setResultText(result);

  function sendGetRequest(url: string) {
    Get(url).then(updateResultText);
  }

  type ResponsePreviewProps = { body: string };

  const ResponsePreviewContainer = styled.div`
    display: flex;
  `;

  const ResponsePreview = (props: ResponsePreviewProps) => (
    <ResponsePreviewContainer>
      <code>{props.body}</code>
    </ResponsePreviewContainer>
  );

  return (
    <div id="App">
      <UrlBar onSend={sendGetRequest} />
      <RequestEditor />
      <ResponsePreview body={resultText} />
    </div>
  );
}

export default App;
