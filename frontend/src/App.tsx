import { useState } from "react";
import "./App.css";
import { Get } from "../wailsjs/go/main/App";

function App() {
  const [resultText, setResultText] = useState("");
  const [name, setName] = useState("");
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function sendGetRequest() {
    Get(name).then(updateResultText);
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
    </div>
  );

  return (
    <div id="App">
      <div id="input" className="input-box">
        <label>URI: </label>
        <input
          id="name"
          className="input"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={sendGetRequest}>
          GET
        </button>
        <button className="btn" onClick={sendGetRequest}>
          POST
        </button>
      </div>

      <RequestBodyEditor text='{"ok": true}' />
      <ResponsePreview body={resultText} />
    </div>
  );
}

export default App;
