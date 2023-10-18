import { Dispatch, SetStateAction } from "react";
import { Alert, AlertStore, createAlertStore } from "./AlertsContext";

type SetAlertsUpdater = (lastState: Alert[]) => Alert[];

const fakeUuuids = {
  first: "a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0",
  second: "b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1",
  third: "c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2",
  fourth: "d3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3",
};

describe("AlertStore", () => {
  let alerts: Alert[] = [];
  let setAlerts = (updater: SetAlertsUpdater) => {
    const newAlerts = updater(alerts);
    alerts = newAlerts;
  };

  let alertStore: AlertStore;

  let uuidGenerator = jest.fn();

  beforeEach(() => {
    alerts = [];

    uuidGenerator
      .mockReset()
      .mockReturnValueOnce(fakeUuuids.first)
      .mockReturnValueOnce(fakeUuuids.second)
      .mockReturnValueOnce(fakeUuuids.third)
      .mockReturnValueOnce(fakeUuuids.fourth);

    alertStore = createAlertStore({
      alerts,
      setAlerts: setAlerts as Dispatch<SetStateAction<Alert[]>>,
      uuidGenerator: uuidGenerator,
    });
  });

  it("Adds all types of alert, with sequential ids", () => {
    alertStore.insertSuccessAlert("hello");
    alertStore.insertDangerAlert("hello");
    alertStore.insertWarningAlert("hello");

    expect(alerts.length).toBe(3);

    expect(alerts[0]).toStrictEqual({
      type: "success",
      text: "hello",
      id: "a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0",
    });

    expect(alerts[1]).toStrictEqual({
      type: "danger",
      text: "hello",
      id: "b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1",
    });

    expect(alerts[2]).toStrictEqual({
      type: "warning",
      text: "hello",
      id: fakeUuuids.third,
    });
  });

  it("Dismisses all alerts", () => {
    alertStore.insertSuccessAlert("hello");
    alertStore.insertDangerAlert("hello");
    alertStore.insertWarningAlert("hello");

    alertStore.dismissAll();

    expect(alerts.length).toBe(0);
  });

  it("Dismisses an alert by id", () => {
    alertStore.insertSuccessAlert("hello");
    alertStore.insertDangerAlert("hello");
    alertStore.insertWarningAlert("hello");

    alertStore.dismiss(fakeUuuids.second);

    expect(alerts.length).toBe(2);

    expect(alerts[0]).toStrictEqual({
      type: "success",
      text: "hello",
      id: fakeUuuids.first,
    });

    expect(alerts[1]).toStrictEqual({
      type: "warning",
      text: "hello",
      id: fakeUuuids.third,
    });
  });

  it("After a dismiss, order is preserved even when adding new alerts", () => {
    alertStore.insertSuccessAlert("hello");
    alertStore.insertDangerAlert("hello");
    alertStore.insertWarningAlert("hello");

    alertStore.dismiss(fakeUuuids.second);

    alertStore.insertSuccessAlert("hello");

    expect(alerts.length).toBe(3);

    expect(alerts[0]).toStrictEqual({
      type: "success",
      text: "hello",
      id: fakeUuuids.first,
    });

    expect(alerts[1]).toStrictEqual({
      type: "warning",
      text: "hello",
      id: fakeUuuids.third,
    });

    expect(alerts[2]).toStrictEqual({
      type: "success",
      text: "hello",
      id: fakeUuuids.fourth,
    });
  });
});
