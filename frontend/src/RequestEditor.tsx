import Tabs from "@mui/joy/Tabs";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import { TabPanel } from "@mui/base";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import "./json-editor.css";
import { Fragment, useState } from "react";
import { Button } from "@mui/joy";
import { useRequest, useRequestDispatch } from "./RequestContext";

const HeaderInserter = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useRequestDispatch();

  return (
    <Grid container>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          role="header-name-setter"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Grid>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          role="header-value-setter"
          placeholder="Value"
          onChange={(event) => setValue(event.target.value)}
          value={value}
          endDecorator={
            <Button
              role="set-header"
              sx={{ borderRadius: "0px", fontFamily: "monospace" }}
              disabled={name === "" || value === ""}
              onClick={() => {
                dispatch({
                  type: "set_header",
                  header: {
                    [name]: value,
                  },
                });
                setName("");
                setValue("");
              }}
            >
              +
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};

const HeaderRow = ({ name, value }: Record<string, string>) => {
  const dispatch = useRequestDispatch();
  return (
    <Grid container>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          value={name}
        />
      </Grid>
      <Grid xs={6}>
        <Input
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
          value={value}
          endDecorator={
            <Button
              sx={{ borderRadius: "0px", fontFamily: "monospace" }}
              onClick={() =>
                dispatch({
                  type: "remove_header",
                  name,
                })
              }
            >
              -
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};

export const HeaderEditor = () => {
  const request = useRequest();

  return (
    <>
      <HeaderInserter />
      {Object.keys(request.headers).map((headerName, id) => (
        <Fragment key={id}>
          <HeaderRow name={headerName} value={request.headers[headerName]} />
        </Fragment>
      ))}
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
