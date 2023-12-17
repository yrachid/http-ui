import { screen, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ResponseView } from "./ResponseView";
import "@testing-library/jest-dom";

describe("ResponseView", () => {
  it("Shows response's status code along with its body unformatted", async () => {
    await act(() =>
      render(
        <ResponseView
          lastResponse={{
            successful: true,
            response: {
              body: "<html>content</html>",
              statusCode: 200,
            },
          }}
        />
      )
    );

    await act(async () => {
      const body = await screen.findByRole("response-body-content");
      const statusCode = await screen.findByRole("response-status-code");

      expect(body).toHaveTextContent("<html>content</html>");
      expect(statusCode).toHaveTextContent("200 OK");
    });
  });
});
