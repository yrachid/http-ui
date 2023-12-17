import Grid from "@mui/joy/Grid";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import styled from "styled-components";
import { TabPanel } from "@mui/base";
import { StatusCode } from "./components/response/StatusCode";

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
        <StatusCode statusCode={props.lastResponse.response.statusCode} />
      </Grid>
      <Grid xs={12}>
        <Tabs defaultValue={0}>
          <TabList>
            <Tab>Body</Tab>
          </TabList>
          <TabPanel value={0}>
            <ResponseBodyContainer role="response-body-content">
              <code>{props.lastResponse.response.body}</code>
            </ResponseBodyContainer>
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid>
  );
};
