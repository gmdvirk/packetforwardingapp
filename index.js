const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Target configurations
const targets = [
  { host: '172.104.24.83', port: 8080 },
  // { host: '192.168.x.x', port: 8080 } // Replace with the actual IP address
];

// Create the server that listens on port 8080
const server = http.createServer((req, res) => {
  targets.forEach((target) => {
    // Proxy each request to the defined targets
    proxy.web(req, res, { target: `http://${target.host}:${target.port}` }, (err) => {
      if (err) {
        console.error(`Error proxying to ${target.host}:${target.port}:`, err);
      }
    });
  });

  // Respond to the original request
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Request forwarded to targets');
});

// Start listening on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
