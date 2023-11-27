import { render, screen, fireEvent } from "@testing-library/react";

import { UrlBar } from "./UrlBar";

import "@testing-library/jest-dom";
import { RequestContextProvider } from "./RequestContext";
import { act } from "react-dom/test-utils";

const renderWithContext = (onSend: () => void) => {
  render(
    <RequestContextProvider>
      <UrlBar onSend={onSend} />
    </RequestContextProvider>
  );
};

describe("UrlBar", () => {
  it("Does not trigger a request if url is empty", async () => {
    const sendCallback = jest.fn();

    act(() => renderWithContext(sendCallback));

    const sendButton = await screen.findByText("Send");

    fireEvent.click(sendButton);

    expect(sendCallback).toHaveBeenCalledTimes(0);
  });

  it("Triggers a request if url is not empty", async () => {
    const sendCallback = jest.fn();

    act(() => renderWithContext(sendCallback));

    const urlInput = await screen.findByPlaceholderText("Enter URL");
    const sendButton = await screen.findByText("Send");

    fireEvent.change(urlInput, { target: { value: "http://localhost:3001" } });
    fireEvent.click(sendButton);

    expect(sendCallback).toHaveBeenCalled();
  });

  it("Does not validate the format of the URL", async () => {
    const sendCallback = jest.fn();

    act(() => renderWithContext(sendCallback));

    const urlInput = await screen.findByPlaceholderText("Enter URL");
    const sendButton = await screen.findByText("Send");

    fireEvent.change(urlInput, { target: { value: "bollocks" } });
    fireEvent.click(sendButton);

    expect(sendCallback).toHaveBeenCalled();
  });
});
