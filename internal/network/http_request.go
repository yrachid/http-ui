package network

import (
	"fmt"
	"net/http"
	"net/url"
)

type HttpRequest struct {
	Url     string
	Headers map[string]string
}

func (request *HttpRequest) PrettyPrintIGuess() {
	fmt.Printf("Url: %s\n", request.Url)
	fmt.Printf("Headers \n")
	for k, v := range request.Headers {
		fmt.Printf("K: [%s]; V: [%s]\n", k, v)
	}
}

func (request HttpRequest) String() string {
	return fmt.Sprintf("Url=%v, Headers=%v", request.Url, request.Headers)
}

func (request *HttpRequest) ToGoRequest() (*http.Request, error) {
	parsedUrl, err := url.ParseRequestURI(request.Url)
	if err != nil {
		return nil, err
	}

	var mappedHeaders = make(map[string][]string, len(request.Headers))

	for k, v := range request.Headers {
		mappedHeaders[k] = []string{v}
	}

	return &http.Request{
		URL:    parsedUrl,
		Header: mappedHeaders,
	}, nil
}
