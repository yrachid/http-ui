import Tabs from "@mui/joy/Tabs";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/base";
import Table from "@mui/joy/Table";
import Grid from "@mui/joy/Grid";
import "./json-editor.css";

const Headers = () => {
  return (
    <Table stripe="odd" borderAxis="both">
      <tbody>
        <tr>
          <td>Accept</td>
          <td>application/json</td>
        </tr>
        <tr>
          <td>Content-Type</td>
          <td>application/json</td>
        </tr>
      </tbody>
    </Table>
  );
};

export const RequestEditor = () => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      sx={{
        padding: "10px",
      }}
    >
      <Grid xs={11}>
        <Tabs defaultValue={0}>
          <TabList>
            <Tab>Headers</Tab>
          </TabList>
          <TabPanel value={0}>
            <Headers />
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid>
  );
};
