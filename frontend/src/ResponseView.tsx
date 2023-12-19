import Grid from "@mui/joy/Grid";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import styled from "styled-components";
import { TabPanel } from "@mui/base";
import { StatusCode } from "./components/response/StatusCode";
import { ResponseHeaders } from "./components/response/ResponseHeaders";

export type LastResponse =
  | null
  | {
      successful: true;
      response: {
        body: string;
        statusCode: number;
        headers: Record<string, string[]>;
      };
    }
  | { successful: false; error: string };

const ResponseBodyContainer = styled.section`
  padding: 5px;
  max-height: 650px;
  overflow: scroll;
`;

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
        <StatusCode code={props.lastResponse.response.statusCode} />
      </Grid>
      <Grid xs={12}>
        <Tabs defaultValue={0}>
          <TabList>
            <Tab>Body</Tab>
            <Tab>Headers</Tab>
          </TabList>
          <TabPanel value={0}>
            <ResponseBodyContainer role="response-body-content">
              <code>{props.lastResponse.response.body}</code>
            </ResponseBodyContainer>
          </TabPanel>
          <TabPanel value={1}>
            <ResponseHeaders headers={props.lastResponse.response.headers} />
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid>
  );
};
