import { createContext, Dispatch, SetStateAction } from "react";

export type AlertType = "success" | "warning" | "danger";

type Uuid = string;

export type Alert = {
  id: Uuid;
  text: string;
  type: AlertType;
};

export type AlertStore = {
  alerts: Alert[];
  insertDangerAlert: (text: string) => void;
  insertWarningAlert: (text: string) => void;
  insertSuccessAlert: (text: string) => void;
  dismiss: (id: Uuid) => void;
  dismissAll: () => void;
};

type AlertStoreProps = {
  alerts: Alert[];
  setAlerts: Dispatch<SetStateAction<Alert[]>>;
  uuidGenerator?: () => string;
};

// TODO: Perhaps this wrapper should become a reducer.
export const createAlertStore = ({
  alerts,
  setAlerts,
  uuidGenerator = () => crypto.randomUUID(),
}: AlertStoreProps): AlertStore => {
  const insert = (type: AlertType) => (text: string) =>
    setAlerts((currentAlerts: Alert[]) => [
      ...currentAlerts,
      { id: uuidGenerator(), text, type },
    ]);

  return {
    alerts,
    insertSuccessAlert: insert("success"),
    insertDangerAlert: insert("danger"),
    insertWarningAlert: insert("warning"),
    dismiss: (id: string) =>
      setAlerts((currentAlerts) => currentAlerts.filter((a) => a.id !== id)),
    dismissAll: () => setAlerts(() => []),
  };
};

const EMPTY_ALERT_STORE = createAlertStore({ alerts: [], setAlerts: () => {} });

export const AlertsContext = createContext<AlertStore>(EMPTY_ALERT_STORE);
