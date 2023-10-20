package main

import (
	"context"
	"github.com/yrachid/http-ui/internal/http"
)

// App struct
type App struct {
	ctx    context.Context
	client *client.HttpClient
}

func NewApp() *App {
	var client = client.NewHttpClient()
	return &App{client: client}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Get(url string) (string, error) {
	response, err := a.client.Get(client.HttpRequest{Url: url})
	return response, err
}
