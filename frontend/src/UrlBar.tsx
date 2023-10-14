import { useState } from "react";
import styled from "styled-components";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export const Container = styled.div`
  display: flex;
`;

export type UrlBarProps = {
  onSend: (url: string) => void;
};

export const UrlBar = (props: UrlBarProps) => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  return (
    <Container>
      <Select
        variant="plain"
        value={method}
        onChange={(_, value) => setMethod(value!)}
        sx={{ width: "130px", borderRadius: "0px", fontFamily: "monospace" }}
      >
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="DELETE">DELETE</Option>
      </Select>
      <Input
        type={"url"}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ borderRadius: "0px", width: "400px", fontFamily: "monospace" }}
      />
      <Button
        variant="solid"
        sx={{ borderRadius: "0px" }}
        onClick={() => props.onSend(url)}
      >
        SEND
      </Button>
    </Container>
  );
};
