package network

import (
	"strings"
	"testing"
)

func TestGetProvidesResponseBodyAsStringAndStatusCode(t *testing.T) {
	var request = HttpRequest{
		Url: "http://localhost:8080/success/text",
	}

	var client = NewHttpClient()

	response, err := client.Get(request)

	if err != nil {
		t.Errorf("Expected a successful but got error: %s", err.Error())
	}

	if response.StatusCode != 200 {
		t.Errorf("Expected status code to be 200 but got '%d'", response.StatusCode)
	}

	if response.Body != "Hello, world!" {
		t.Errorf("Expected response body to be 'Hello, world!' but got '%s'", response.Body)
	}
}

func TestGetPreservesMultiValueHeaders(t *testing.T) {
	request := HttpRequest{
		Url: "http://localhost:8080/success/text/multi-value-response-header",
	}

	client := NewHttpClient()

	response, err := client.Get(request)

	if err != nil {
		t.Errorf("Expected a successful but got error: %s", err.Error())
	}

	customHeader := response.Headers["Custom-Header"]

	if response.StatusCode != 200 {
		t.Errorf("Expected status code to be 200 but got '%d'", response.StatusCode)
	}

	if len(customHeader) != 2 {
		t.Errorf("Unexpected number of values for custom header. Expected 2, got %d", len(customHeader))
		t.FailNow()
	}

	if customHeader[0] != "value-1" {
		t.Errorf("Expected first value of custom header to be '' but got: %s", customHeader[0])
	}

	if customHeader[1] != "value-2" {
		t.Errorf("Expected second value of custom header to be '' but got: %s", customHeader[1])
	}
}

func TestGetSpecifiesCustomHeaders(t *testing.T) {
	request := HttpRequest{
		Url: "http://localhost:8080/success/text/custom-headers",
		Headers: map[string]string{
			"Content-Type": "application/json; charset=UTF-8",
		},
	}

	client := NewHttpClient()

	response, err := client.Get(request)

	if err != nil {
		t.Errorf("Expected a successful but got error: %s", err.Error())
	}

	if response.Body != "Headers Received" {
		t.Errorf("Expected response body to be 'Headers Received' but got '%s'", response.Body)
	}

	if response.StatusCode != 200 {
		t.Errorf("Expected status code to be 200 but got '%d'", response.StatusCode)
	}
}

func TestGetProvidesErrorWhenHostIsInvalid(t *testing.T) {
	var request = HttpRequest{
		Url: "http://site.invalid/success/text",
	}

	var client = NewHttpClient()

	_, err := client.Get(request)

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

	_, err := client.Get(request)

	if err == nil {
		t.Errorf("Expected an error but got none")
	}

	if err.Error() != "Failed to read response body: unexpected EOF" {
		t.Errorf("Unexpected error message: %s", err.Error())
	}
}
