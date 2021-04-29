import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => res.send('Temp Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
