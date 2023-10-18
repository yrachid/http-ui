import { render, screen, fireEvent } from "@testing-library/react";

import { UrlBar } from "./UrlBar";

import "@testing-library/jest-dom";

describe("UrlBar", () => {
  it("Does not trigger a request if url is empty", async () => {
    const sendCallback = jest.fn();

    render(<UrlBar onSend={sendCallback} />);

    const sendButton = await screen.findByText("Send");

    fireEvent.click(sendButton);

    expect(sendCallback).toHaveBeenCalledTimes(0);
  });

  it("Triggers a request if url is not empty", async () => {
    const sendCallback = jest.fn();
    render(<UrlBar onSend={sendCallback} />);

    const urlInput = await screen.findByPlaceholderText("Enter URL");
    const sendButton = await screen.findByText("Send");

    fireEvent.change(urlInput, { target: { value: "http://localhost:3001" } });
    fireEvent.click(sendButton);

    expect(sendCallback).toHaveBeenCalledWith("http://localhost:3001");
  });

  it("Prepends URL with http:// if protocol is missing", async () => {
    const sendCallback = jest.fn();

    render(<UrlBar onSend={sendCallback} />);

    const urlInput = await screen.findByPlaceholderText("Enter URL");
    const sendButton = await screen.findByText("Send");

    fireEvent.change(urlInput, { target: { value: "localhost:3001" } });
    fireEvent.click(sendButton);

    expect(sendCallback).toHaveBeenCalledWith("http://localhost:3001");
    expect(urlInput).toHaveValue("http://localhost:3001");
  });
});
