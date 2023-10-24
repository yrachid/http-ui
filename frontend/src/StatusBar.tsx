import styled from "styled-components";

import Alert from "@mui/joy/Alert";
import { useContext, useEffect, useState } from "react";
import { AlertsContext } from "./AlertsContext";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

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
  const [time, setTime] = useState(new Date().toString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toString());
    }, 1000);
  }, [time]);

  return <div>{time}</div>;
};

export const StatusBar = () => {
  const store = useContext(AlertsContext);

  return (
    <StatusBarWrapper>
      <AlertContainer>
        {store.alerts.map((alert) => (
          <Alert
            key={alert.id}
            color={alert.type}
            startDecorator={<ReportIcon />}
            endDecorator={
              <IconButton
                variant="soft"
                color={alert.type}
                onClick={() => store.dismiss(alert.id)}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            Error
            <Typography level="body-sm" color={alert.type}>
              {alert.text}
            </Typography>
          </Alert>
        ))}
      </AlertContainer>
      <StatusContainer>
        <Clock />
      </StatusContainer>
    </StatusBarWrapper>
  );
};
