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

func (client *HttpClient) Get(request HttpRequest) (*HttpResponse, error) {
	var convertedReq, requestConversionError = request.ToGoRequest()

	if requestConversionError != nil {
		return nil, requestConversionError
	}

	response, err := http.DefaultClient.Do(convertedReq)

	if err != nil {
		return nil, err
	}

	var responseBodyBytes, readError = io.ReadAll(response.Body)

	if readError != nil {
		msg := fmt.Sprintf("Failed to read response body: %s", readError.Error())
		return nil, errors.New(msg)
	}

	var res = &HttpResponse{
		StatusCode: response.StatusCode,
		Body:       string(responseBodyBytes),
		Headers:    response.Header,
	}

	return res, nil
}
