import Tabs from "@mui/joy/Tabs";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/base";
import "./json-editor.css";
import { useState } from "react";

const JsonEditor = () => {
  const [lastKeyPressed, updateLastKeyPressed] = useState("");
  return (
    <div className="editor">
      <div className="gutter">
        <div className="line-number">1</div>
        <div className="line-number">2</div>
      </div>
      <div
        className="lines"
        onKeyDown={(event) => {
        event.preventDefault();
          updateLastKeyPressed(event.key);
        }}
        tabIndex={1}
      >
        <div className="line">{"{"}</div>
        <div className="line">{lastKeyPressed}</div>
      </div>
    </div>
  );
};

export const RequestEditor = () => {
  return (
    <Tabs defaultValue={0}>
      <TabList>
        <Tab>Body</Tab>
        <Tab>Headers</Tab>
      </TabList>
      <TabPanel value={0}>
        <JsonEditor />
      </TabPanel>
      <TabPanel value={1}>Headers</TabPanel>
    </Tabs>
  );
};
