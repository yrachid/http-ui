package main

import (
	"context"
	"fmt"
	"github.com/yrachid/http-ui/internal/network"
)

type App struct {
	ctx    context.Context
	client *network.HttpClient
}

func NewApp() *App {
	var client = network.NewHttpClient()
	return &App{client: client}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

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

func (a *App) GetWithHeaders(request HttpRequest) string {
	fmt.Println(">>>>>>>>>>>>>>>>>>>")
	request.PrettyPrintIGuess()
	fmt.Println(">>>>>>>>>>>>>>>>>>>")
	return "ok"
}

func (a *App) Get(url string) (string, error) {
	response, err := a.client.Get(network.HttpRequest{Url: url})
	return response, err
}
