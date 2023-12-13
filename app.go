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

func (a *App) GetWithHeaders(request network.HttpRequest) (string, error) {
	fmt.Println(">>>>>>>>>>>>>>>>>>>")
	request.PrettyPrintIGuess()
	fmt.Println(">>>>>>>>>>>>>>>>>>>")

	response, err := a.client.Get(request)
	return response, err
}
