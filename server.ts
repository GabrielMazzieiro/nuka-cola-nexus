import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});