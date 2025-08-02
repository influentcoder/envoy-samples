const http2 = require('http2');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  allowHTTP1: true  // fallback to HTTP/1.1 if client doesn't support HTTP/2
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {

  let body = '';
  stream.on('data', chunk => {
    body += chunk.toString();
  });

  stream.on('end', () => {
    stream.respond({ ':status': 200 });
    stream.end('Hello from HTTP/2');
  });
});

server.on('request', (req, res) => {
  const socket = req.socket;

  const tlsInfo = socket.getPeerCertificate ? {
    protocol: socket.getProtocol(),
    cipher: socket.getCipher(),
    alpnProtocol: socket.alpnProtocol,
    remoteAddress: socket.remoteAddress,
    peerCert: socket.getPeerCertificate()
  } : {};

  if (!req.stream) {
    // This is an HTTP/1.1 request
    console.log('\n=== HTTP/1.1 Request ===');
  } else {
    // This is an HTTP/2 request
    console.log('\n=== HTTP/2 Request ===');
  }
  console.log('TLS Info:', tlsInfo);
  console.log('Headers:', req.headers);

  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    if (body) console.log('Body:', body);

    if (!res.stream) { // means it's really HTTP/1.1
        res.writeHead(200);
    }
    res.end('Hello from HTTP/1.1');
  });
});


server.listen(8443, () => {
  console.log('🔐 Listening on https://localhost:8443');
});

