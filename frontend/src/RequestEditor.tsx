import Tabs from "@mui/joy/Tabs";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/base";
import Table from "@mui/joy/Table";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import "./json-editor.css";
import { useState } from "react";
import { Button } from "@mui/joy";

type HttpHeaders = Record<string, string>;

type InserterProps = {
  onInsert: (name: string, value: string) => void;
};

const HeaderInserter = (props: InserterProps) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  return (
    <Grid container>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          role="header-name-inserter"
          placeholder="Header name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Grid>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          role="header-value-inserter"
          placeholder="Header value"
          onChange={(event) => setValue(event.target.value)}
          value={value}
          endDecorator={
            <Button
              role="insert-header"
              onClick={() => props.onInsert(name, value)}
            >
              +
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};

export const HeaderEditor = () => {
  const [headers, setHeaders] = useState<HttpHeaders>({});

  return (
    <>
      <HeaderInserter
        onInsert={(name, value) =>
          setHeaders({
            ...headers,
            ...{ [name]: value },
          })
        }
      />
      <Table stripe="odd" borderAxis="both" role="header-table-editor">
        <tbody>
          {Object.keys(headers).map((headerName, id) => (
            <tr role="inserted-header" key={id}>
              <td role="inserted-header-name">{headerName}</td>
              <td role="inserted-header-value">{headers[headerName]}</td>
              <td>
                <Button>-</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
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
            <HeaderEditor />
          </TabPanel>
        </Tabs>
      </Grid>
    </Grid>
  );
};
