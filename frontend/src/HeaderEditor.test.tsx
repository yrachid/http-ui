import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HeaderEditor } from "./RequestEditor";
import { act } from "react-dom/test-utils";
import { RequestContextProvider } from "./RequestContext";

const type = (input: HTMLElement, intendedText: string) =>
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
      const headerNameInput = await screen.findByPlaceholderText("Name");
      const headerValueInput = await screen.findByPlaceholderText("Value");

      const insertHeaderButton = await screen.findByRole("set-header");

      type(headerNameInput, "Content-Type");
      type(headerValueInput, "application/json");

      fireEvent.click(insertHeaderButton);
    });

    const insertedHeaderName = await screen.findByRole("header-name");
    const insertedHeaderValue = await screen.findByRole("header-value");

    expect(insertedHeaderName).toHaveValue("Content-Type");
    expect(insertedHeaderValue).toHaveValue("application/json");
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

    const headerName = await screen.findByRole("header-name");
    const headerValue = await screen.findByRole("header-value");

    console.log(headerName.nodeValue);

    expect(headerName).toHaveValue("Content-Type");
    expect(headerValue).toHaveValue("application/json");
  });
});
