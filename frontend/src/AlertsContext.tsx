import { createContext } from "react";

export type Alert = {
  id: number;
  text: string;
  type: "success" | "warning" | "danger";
};

export const AlertsContext = createContext<Alert[]>([]);
