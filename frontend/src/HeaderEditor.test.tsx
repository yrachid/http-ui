import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HeaderEditor } from "./RequestEditor";
import { act } from "react-dom/test-utils";

const type = (input: HTMLElement, intendedText: string) =>
  fireEvent.change(input, { target: { value: intendedText } });

describe("HeaderEditor", () => {
  it("Inserts a new header on the header list", async () => {
    await act(() => render(<HeaderEditor />));

    await act(async () => {
      const headerNameInput = await screen.findByPlaceholderText("Header name");
      const headerValueInput = await screen.findByPlaceholderText(
        "Header value"
      );

      const insertHeaderButton = await screen.findByRole("insert-header");

      type(headerNameInput, "Content-Type");
      type(headerValueInput, "application/json");

      fireEvent.click(insertHeaderButton);
    });

    const insertedHeaderName = await screen.findByRole("inserted-header-name");
    const insertedHeaderValue = await screen.findByRole(
      "inserted-header-value"
    );

    expect(insertedHeaderName).toHaveTextContent("Content-Type");
    expect(insertedHeaderValue).toHaveTextContent("application/json");
  });
});
