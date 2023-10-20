package main

import (
	"context"
	"github.com/yrachid/http-ui/internal/http"
)

type App struct {
	ctx    context.Context
	client *http.HttpClient
}

func NewApp() *App {
	var client = http.NewHttpClient()
	return &App{client: client}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Get(url string) (string, error) {
	response, err := a.client.Get(http.HttpRequest{Url: url})
	return response, err
}
