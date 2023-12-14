import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HeaderEditor } from "./RequestEditor";
import { act } from "react-dom/test-utils";
import { RequestContextProvider } from "./RequestContext";

const type = (intendedText: string) => (input: HTMLElement) =>
  fireEvent.change(input, { target: { value: intendedText } });

describe("HeaderEditor", () => {
  it("Inserts a new header on the header list", async () => {
    await act(() =>
      render(
        <RequestContextProvider>
          <HeaderEditor />
        </RequestContextProvider>
      )
    );

    await act(async () => {
      await screen.findByPlaceholderText("Name").then(type("Content-Type"));
      await screen
        .findByPlaceholderText("Value")
        .then(type("application/json"));

      const insertHeaderButton = await screen.findByRole("set-header");

      fireEvent.click(insertHeaderButton);
    });

    expect(screen.queryByDisplayValue("Content-Type")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("application/json")).toBeInTheDocument();
  });

  it("Removes a header from the request", async () => {
    const initialRequest = {
      url: "http://localhost:3001",
      headers: {
        Accept: "application/json",
      },
    };

    await act(() =>
      render(
        <RequestContextProvider initialRequest={initialRequest}>
          <HeaderEditor />
        </RequestContextProvider>
      )
    );

    const headerName = screen.queryByDisplayValue("Accept");
    const headerValue = screen.queryByDisplayValue("application/json");

    const removeHeaderButton = await screen.findByText("-");

    expect(headerName).toBeInTheDocument();
    expect(headerValue).toBeInTheDocument();

    await act(() => fireEvent.click(removeHeaderButton));

    expect(screen.queryByDisplayValue("Accept")).not.toBeInTheDocument();
    expect(
      screen.queryByDisplayValue("application/json")
    ).not.toBeInTheDocument();
  });
});
