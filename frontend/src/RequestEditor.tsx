import Tabs from "@mui/joy/Tabs";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/base";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  padding-top: 0px;
`;

export const RequestEditor = () => {
  return (
    <Container>
      <Tabs defaultValue={0}>
        <TabList>
          <Tab>Body</Tab>
          <Tab>Headers</Tab>
        </TabList>
        <TabPanel value={0}>Body</TabPanel>
        <TabPanel value={1}>Headers</TabPanel>
      </Tabs>
    </Container>
  );
};
