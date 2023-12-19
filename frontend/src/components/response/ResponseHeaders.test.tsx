import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { ResponseHeaders } from "./ResponseHeaders";

describe("ResponseHeaders", () => {
  it("Displays each value of a multi-value header as a repeated item", async () => {
    const headers = {
      "Content-Type": ["application/json"],
      "Custom-Header": ["value-1", "value-2"],
    };

    act(() => render(<ResponseHeaders headers={headers} />));

    const renderedHeaders = await screen.findAllByRole("response-header");

    expect(renderedHeaders.length).toEqual(3);
    expect(renderedHeaders[0].textContent).toEqual(
      "Content-Type: application/json"
    );
    expect(renderedHeaders[1].textContent).toEqual("Custom-Header: value-1");
    expect(renderedHeaders[2].textContent).toEqual("Custom-Header: value-2");
  });
});
