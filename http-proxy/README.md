# Envoy HTTP Proxy

This example demonstrates how to use Envoy as an HTTP proxy server.

It acceps HTTP CONNECT requests and forwards them to a user-specified upstream backend.

## Usage

In a terminal, run the upstream backend, and Envoy:

```bash
./run_containers.sh
```

In another terminal, run the client:

```bash
curl -x localhost:3128 --cacert server.crt https://node-app:8443
```

Output:

```
Hello from HTTP/2
```

