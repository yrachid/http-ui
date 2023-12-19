import { useContext, useState } from "react";
import { AlertsContext } from "./AlertsContext";
import http from "./network/http";
import { useRequest, useRequestDispatch } from "./RequestContext";
import { RequestEditor } from "./RequestEditor";
import { UrlBar } from "./UrlBar";
import { LastResponse, ResponseView } from "./ResponseView";

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
        console.debug("Received response from Go client", data);
        setLastResponse({
          successful: true,
          response: { body: data.Body, statusCode: data.StatusCode, headers: data.Headers },
        });
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
      <ResponseView lastResponse={lastResponse} />
    </div>
  );
};
