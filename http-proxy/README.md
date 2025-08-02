# Envoy HTTP Proxy

This example demonstrates how to use Envoy as an HTTP proxy server.

It acceps HTTP CONNECT requests and forwards them to a user-specified upstream backend.

## Usage

Generate a self-signed certificate for the upstream backend:

```bash
./gen_cert.sh
```

In a terminal, run the upstream backend:

```bash
./run_backend.sh
```

In another terminal, run the Envoy proxy:

```bash
./run_envoy.sh
```

In a third terminal, run the client:

```bash
curl -x localhost:3128 --cacert server.crt https://localhost:8443; echo
```

Output:

```
Hello from HTTP/2
```
