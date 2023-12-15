import Grid from "@mui/joy/Grid";
import styled from "styled-components";

export type LastResponse =
  | null
  | { successful: true; response: { body: string; statusCode: number } }
  | { successful: false; error: string };

export const ResponseView = (props: { lastResponse: LastResponse }) => {
  if (props.lastResponse === null) {
    return <p>Waiting for a request to be made...</p>;
  }

  if (!props.lastResponse.successful) {
    return (
      <p>
        Something went wrong: {props.lastResponse?.error ?? "Unknown Error"}
      </p>
    );
  }

  const StatusCodeContainer = styled.section`
    padding: 5px;
  `;

  const ResponseBodyContainer = styled.section`
    padding: 5px;
    max-height: 650px;
    overflow: scroll;
  `;

  return (
    <Grid
      xs={11}
      container
      spacing={0}
      alignItems="center"
      sx={{
        padding: "10px",
      }}
    >
      <Grid xs={12}>
        <StatusCodeContainer role="response-status-code">
          {props.lastResponse.response.statusCode}
        </StatusCodeContainer>
      </Grid>
      <Grid xs={12}>
        <ResponseBodyContainer role="response-body-content">
          <code>{props.lastResponse.response.body}</code>
        </ResponseBodyContainer>
      </Grid>
    </Grid>
  );
};
