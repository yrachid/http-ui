import { cleanup, render, screen } from "@testing-library/react";

import { JsonEditor } from "./JsonEditor";

import "@testing-library/jest-dom";

afterEach(cleanup);

describe("JsonEditor", () => {
  it("renders", () => {
    render(<JsonEditor />);

    expect(screen.getByRole("editor")).toHaveTextContent("Hello");
  });
});
