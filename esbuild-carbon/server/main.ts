import express from 'express';
import path from 'path';

const app = express();
const cwd = process.cwd();

app.use(express.static(path.join(cwd, 'dist')));

app.get('/', function (req: any, res: any) {
  res.sendFile(path.join(cwd, 'dist', 'index.html'));
});

const port = 3001;
app.listen(port);
console.log(`Server listening on port ${port}`);
