#!/usr/bin/env bash

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout server.key -out server.crt \
  -config <(cat <<EOF
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = localhost

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
EOF
)
