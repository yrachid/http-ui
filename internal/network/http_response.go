package network

type HttpResponse struct {
	StatusCode int
	Body       string
	Headers    map[string][]string
}
