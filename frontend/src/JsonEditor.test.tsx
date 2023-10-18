import { render, screen } from "@testing-library/react";

import { JsonEditor } from "./JsonEditor";

import "@testing-library/jest-dom";

describe("JsonEditor", () => {
  it("renders", () => {
    render(<JsonEditor />);

    expect(screen.getByRole("editor")).toHaveTextContent("Hello");
  });
});
