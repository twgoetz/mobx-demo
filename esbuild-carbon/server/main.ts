import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req: any, res: any) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = 3001;
app.listen(port);
console.log(`Server listening on port ${port}`);
