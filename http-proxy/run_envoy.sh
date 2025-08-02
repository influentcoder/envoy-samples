#!/usr/bin/env bash
podman run -it --rm -v ./envoy.yaml:/etc/envoy/envoy.yaml --network host docker.io/envoyproxy/envoy:v1.35.0
