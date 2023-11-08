package http

import (
	"strings"
	"testing"
)

func TestGetProvidesResponseBodyAsString(t *testing.T) {

	var request = HttpRequest{
		Url: "http://localhost:8080/success/text",
	}

	var client = NewHttpClient()

	response, err := client.Get(request)

	if err != nil {
		t.Errorf("Expected a successful but got error: %s", err.Error())
	}

	if response != "Hello, world!" {
		t.Errorf("Expected response body to be 'Hello, world!' but got '%s'", response)
	}
}

func TestGetProvidesErrorWhenHostIsInvalid(t *testing.T) {
	var request = HttpRequest{
		Url: "http://site.invalid/success/text",
	}

	var client = NewHttpClient()

	response, err := client.Get(request)

	if response != "" {
		t.Errorf("Expected response body to be empty but got '%s'", response)
	}

	if err == nil {
		t.Errorf("Expected an error but got none")
	}

	if !strings.Contains(err.Error(), "Get \"http://site.invalid/success/text\"") || !strings.Contains(err.Error(), "no such host") {
		t.Errorf("Unexpected error message: %s", err.Error())
	}
}

func TestGetProvidesErrorWhenResponseDataIsInvalid(t *testing.T) {
	var request = HttpRequest{
		Url: "http://localhost:8080/fault/malformed-response",
	}

	var client = NewHttpClient()

	response, err := client.Get(request)

	if response != "" {
		t.Errorf("Expected response body to be empty but got '%s'", response)
	}

	if err == nil {
		t.Errorf("Expected an error but got none")
	}

	if err.Error() != "Failed to read response body: unexpected EOF" {
		t.Errorf("Unexpected error message: %s", err.Error())
	}
}
