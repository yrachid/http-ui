package network

import "testing"

func TestInvalidUrlParsingErrorIsForwarded(t *testing.T) {
	incomingReq := HttpRequest{
		Url:     "...",
		Headers: map[string]string{},
	}

	req, err := incomingReq.ToGoRequest()

	if err == nil {
		t.Errorf("Expected error, got success %v", req)
	}

	if err.Error() != "parse \"...\": invalid URI for request" {
		t.Errorf("Expected error, got %s", err.Error())
	}
}

func TestMapsHeadersToGoFormat(t *testing.T) {
	incomingReq := HttpRequest{
		Url: "http://localhost:3000",
		Headers: map[string]string{
			"Content-Type": "application/json; charset=UTF-8",
		},
	}

	req, err := incomingReq.ToGoRequest()

	if err != nil {
		t.Errorf("Expected success, got error %v", err)
	}

	if req.Header["Content-Type"][0] != "application/json; charset=UTF-8" {
		t.Errorf("Unexpected header value: %v", req.Header)
	}
}
