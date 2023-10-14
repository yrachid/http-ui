package main

import (
	"context"
	"fmt"
  "net/http"
  "io/ioutil"
  "log"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Get(url string) string {
  response, err := http.Get(url)

  if err != nil {
    log.Fatal(err)
  }

  responseData, err:= ioutil.ReadAll(response.Body)

  if err != nil {
    log.Fatal(err)
  }

  return string(responseData)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
