
go-fmt:
	gofmt -l -w internal

test-frontend:
	npm --prefix frontend test

test-go:
	go test -v ./...

test: test-go test-frontend
