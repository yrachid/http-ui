import styled from "styled-components";

import Alert from "@mui/joy/Alert";
import { useEffect, useState } from "react";
import { Alert as AlertData } from "./AlertsContext";

const StatusBarWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 98%;
  min-height: 30px;
  line-height: 30px;
  color: black;
  font-family: monospace;
`;

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 70%;
`;

export type AlertProps = {
  type: "danger" | "warning" | "success";
  message: string;
};

const StatusContainer = styled.div`
  text-align: right;
  padding-right: 15px;
  background-color: lime;
  margin-top: 10px;
`;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, [time]);

  return <div>{time.toString()}</div>;
};

type Status = {
  alerts: AlertData[];
}

export const StatusBar = (props: Status) => {
  console.log("hello");
  console.log("alerts", JSON.stringify(props.alerts));
  return (
    <StatusBarWrapper>
      <AlertContainer>
        {props.alerts.map((alert, index) => (
          <Alert key={index} color={alert.type}>
            {alert.text}
          </Alert>
        ))}
      </AlertContainer>
      <StatusContainer>
        <Clock />
      </StatusContainer>
    </StatusBarWrapper>
  );
};
