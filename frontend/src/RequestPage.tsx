import { useContext, useState } from "react";
import styled from "styled-components";
import { AlertsContext } from "./AlertsContext";
import http from "./network/http";
import { useRequest, useRequestDispatch } from "./RequestContext";
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
  const request = useRequest();
  const dispatch = useRequestDispatch();

  // TODO: Move this out, add tests
  function sendGetRequest() {
    const normalisedUrl = request.url.includes("://")
      ? request.url
      : `http://${request.url}`;

    http
      .get({
        ...request,
        url: normalisedUrl,
      })
      .then((data) => {
        dispatch({
          type: "update_url",
          newUrl: normalisedUrl,
        });
        console.debug("Received response from Go client", data)
        setLastResponse({ successful: true, body: data.Body });
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
