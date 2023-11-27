import { useState } from "react";
import styled from "styled-components";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/joy/Grid";
import { useRequest, useRequestDispatch } from "./RequestContext";

export const Container = styled.div`
  display: flex;
`;

export type UrlBarProps = {
  onSend: () => void;
};

export const UrlBar = (props: UrlBarProps) => {
  const request = useRequest();
  const dispatch = useRequestDispatch();

  const [method, setMethod] = useState("GET");

  const handleSendClick = (): void => {
    if (!request.url) {
      return;
    }

    props.onSend();
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
        </Select>
      </Grid>
      <Grid xs={8}>
        <Input
          type="url"
          value={request.url}
          onChange={(e) =>
            dispatch({
              type: "update_url",
              newUrl: e.target.value,
            })
          }
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
