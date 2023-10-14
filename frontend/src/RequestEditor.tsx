import Tabs from "@mui/joy/Tabs";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/base";

export const RequestEditor = () => {
  return (
    <Tabs defaultValue={0}>
      <TabList>
        <Tab>Body</Tab>
        <Tab>Headers</Tab>
      </TabList>
      <TabPanel value={0}>Body</TabPanel>
      <TabPanel value={1}>Headers</TabPanel>
    </Tabs>
  );
};
