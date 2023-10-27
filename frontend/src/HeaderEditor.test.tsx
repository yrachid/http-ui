import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { HeaderEditor } from "./RequestEditor";

describe("HeaderEditor", () => {
  it("renders", async () => {
    render(<HeaderEditor />);

    const headerTable = await screen.findByRole("header-table-editor");

  });
});
