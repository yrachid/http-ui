import { useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
  display: flex;
  border: solid 1px red;
  width: 700px;
  font-family: monospace;
`;

export const Input = styled.input`
  padding: 5px;
  margin: 0px;
  height: 20px;
  width: 500px;
  line-height: 30px;
  border: 0px;
  background-color: black;
  color: white;
  border: solid 1px red;
  font-size: 12px;
  font-family: monospace;
`;

export const SendButton = styled.button`
  height: 32px;
  width: 60px;
  border: solid 1px red;
  font-weight: bold;
`;

export const MethodSelector = styled.select`
  height: 35px;
`;

export const CustomSelectorStyle = styled.div`
  height: 30px;
  width: 90px;
  line-height: 30px;
  border: solid 1px red;
`;

export const CustomSelector = (props: { options: string[] }) => {
  return (
    <CustomSelectorStyle>
      {props.options.map((option) => (
        <div>{option}</div>
      ))}
    </CustomSelectorStyle>
  );
};

export type UrlBarProps = {
  onSend: (url: string) => void;
};

export const UrlBar = (props: UrlBarProps) => {
  const [url, setUrl] = useState("");
  return (
    <Container>
      <CustomSelector options={["OPTIONS"]} />
      <Input
        type={"url"}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <SendButton onClick={() => props.onSend(url)}>SEND</SendButton>
    </Container>
  );
};
