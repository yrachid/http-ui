import styled from "styled-components";

export type LastResponse =
  | null
  | { successful: true; response: { body: string; statusCode: number } }
  | { successful: false; error: string };

const ResponseViewContainer = styled.div`
  display: flex;
`;

export const ResponseView = (props: { lastResponse: LastResponse }) => (
  <ResponseViewContainer>
    {props.lastResponse?.successful && (
      <p role="response-status-code">{props.lastResponse.response.statusCode}</p>
    )}
    {props.lastResponse?.successful && (
      <code role="response-body-content">
        {props.lastResponse.response.body}
      </code>
    )}
  </ResponseViewContainer>
);
