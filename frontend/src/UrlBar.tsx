import { useState } from "react";
import styled from "styled-components";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/joy/Grid";

export const Container = styled.div`
  display: flex;
`;

export type UrlBarProps = {
  onSend: (url: string) => void;
};

export const UrlBar = (props: UrlBarProps) => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");

  const handleSendClick = (): void => {
    if (!url) {
      return;
    }

    if (!url.includes("://")) {
      const newUrl = `http://${url}`;
      setUrl(newUrl);
      props.onSend(newUrl);
      return;
    }

    props.onSend(url);
  };

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      sx={{
        padding: "10px",
      }}
    >
      <Grid xs={2}>
        <Select
          variant="plain"
          value={method}
          onChange={(_, value) => setMethod(value!)}
          sx={{ fontFamily: "monospace" }}
        >
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
          <Option value="PUT">PUT</Option>
          <Option value="DELETE">DELETE</Option>
        </Select>
      </Grid>
      <Grid xs={8}>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          autoComplete="off"
          sx={{ borderRadius: "0px", fontFamily: "monospace" }}
        />
      </Grid>

      <Grid xs={1} alignItems="left">
        <Button
          variant="solid"
          sx={{
            marginLeft: "10px",
            marginRight: "10px",
            width: "100%",
            fontFamily: "monospace",
          }}
          onClick={handleSendClick}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};
