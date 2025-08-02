#!/usr/bin/env bash
podman run -it --rm --init -p 8443:8443 -v .:/server --entrypoint /bin/bash docker.io/node:24-bookworm -c "cd /server && node server.js"
