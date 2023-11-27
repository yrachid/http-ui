import { useContext, useState } from "react";
import styled from "styled-components";
import { Get, GetWithHeaders } from "../wailsjs/go/main/App";
import { AlertsContext } from "./AlertsContext";
import { RequestEditor } from "./RequestEditor";
import { UrlBar } from "./UrlBar";

type LastResponse =
  | null
  | { successful: true; body: string }
  | { successful: false; error: string };

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

export const RequestPage = () => {
  const [lastResponse, setLastResponse] = useState<LastResponse>(null);
  const store = useContext(AlertsContext);

  function sendGetRequest(url: string) {
    GetWithHeaders({
      url: "http://some-url.com",
      headers: {
        Accept: "text/xml",
      },
    });

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
    <div>
      <UrlBar onSend={sendGetRequest} />
      <RequestEditor />
      <ResponsePreview lastResponse={lastResponse} />
    </div>
  );
};
