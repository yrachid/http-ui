import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { StatusCode } from "./StatusCode";

describe("StatusCode", () => {
  it("Displays Status code and respective text", async () => {
    act(() => render(<StatusCode code={200} />));

    const statusCodeInDisplay = await screen.findByText("Status: 200 OK");

    expect(statusCodeInDisplay).toBeInTheDocument();
  });
});
