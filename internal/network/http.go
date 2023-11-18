package network

import (
	"errors"
	"fmt"
	"io"
	"net/http"
)

type HttpClient struct {
}

func NewHttpClient() *HttpClient {
	return &HttpClient{}
}

func (client *HttpClient) Get(request HttpRequest) (string, error) {
	var convertedReq, requestConversionError = request.ToGoRequest()

	if requestConversionError != nil {
		return "", requestConversionError
	}

	response, err := http.DefaultClient.Do(convertedReq)

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
