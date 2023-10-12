import { useState } from "react";
import "./App.css";
import { Get } from "../wailsjs/go/main/App";
import { UrlBar } from "./UrlBar";

function App() {
  const [resultText, setResultText] = useState("");
  const updateResultText = (result: string) => setResultText(result);

  function sendGetRequest(url: string) {
    Get(url).then(updateResultText);
  }

  type EditorProps = {
    text: string;
  };

  const RequestBodyEditor = (props: EditorProps) => (
    <div>
      <h1>Request Body</h1>
      <textarea>{props.text}</textarea>
    </div>
  );

  type ResponsePreviewProps = { body: string };
  const ResponsePreview = (props: ResponsePreviewProps) => (
    <div>
      <h1>Response:</h1>

      <h3>Body</h3>
      <code>{props.body}</code>
      <code>
        {"{"}
        <span>"ok"</span>
        <span>:</span>
        <span>true</span>
        {"}"}
      </code>
    </div>
  );

  return (
    <div id="App">
      <UrlBar onSend={sendGetRequest} />
      <RequestBodyEditor text='{"ok": true}' />
      <ResponsePreview body={resultText} />
    </div>
  );
}

export default App;
