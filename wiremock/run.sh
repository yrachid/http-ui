#!/bin/bash -eu

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

docker run -it \
  --rm \
  --publish 8080:8080 \
  --name wiremock \
  --volume "${SCRIPT_DIR}/setup:/home/wiremock" \
  --detach \
  wiremock/wiremock:3.2.0
