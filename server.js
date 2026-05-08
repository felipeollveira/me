const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/store' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Bem-vindo à store!' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Rota não encontrada');
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
