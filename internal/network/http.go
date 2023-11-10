package network

import (
	"errors"
	"fmt"
	"io"
	"net/http"
)

type HttpRequest struct {
	Url         string
	RequestBody string
}

type HttpClient struct {
}

func NewHttpClient() *HttpClient {
	return &HttpClient{}
}

func (client *HttpClient) Get(request HttpRequest) (string, error) {
	response, err := http.Get(request.Url)

	if err != nil {
		return "", err
	}

	var responseBodyBytes, readError = io.ReadAll(response.Body)

	if readError != nil {
		msg := fmt.Sprintf("Failed to read response body: %s", readError.Error())
		return "", errors.New(msg)
	}

	return string(responseBodyBytes), nil
}
