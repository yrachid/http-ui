package main

import (
	"context"
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

func (a *App) Get(url string) (string, error) {
	response, err := a.client.Get(network.HttpRequest{Url: url})
	return response, err
}
