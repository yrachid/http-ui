import { reducer } from "./RequestContext";

describe("RequestContextReducer", () => {
  const initialHeaders = {
    "Content-Type": "application/json",
  };
  const request = {
    url: "http://localhost:3000",
    headers: initialHeaders,
  };

  it("updates request url", () => {
    const updatedRequest = reducer(request, {
      type: "update_url",
      newUrl: "http://localhost:3001",
    });

    expect(updatedRequest.url).toEqual("http://localhost:3001");
    expect(updatedRequest.headers).toEqual(initialHeaders);
  });

  it("adds a new header to the request", () => {
    const updatedRequest = reducer(request, {
      type: "set_header",
      header: {
        Accept: "image/png",
      },
    });

    expect(updatedRequest.url).toEqual("http://localhost:3000");
    expect(updatedRequest.headers).toEqual({
      "Content-Type": "application/json",
      Accept: "image/png",
    });
  });

  it("sets a new value for a pre-existing header", () => {
    const updatedRequest = reducer(request, {
      type: "set_header",
      header: {
        "Content-Type": "text/xml",
      },
    });

    expect(updatedRequest.url).toEqual("http://localhost:3000");
    expect(updatedRequest.headers).toEqual({
      "Content-Type": "text/xml",
    });
  });
});
