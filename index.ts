import express from 'express';
import artistRouter from './routes/artist';
import mongoose from 'mongoose';
import config from './config';
import albumRouter from './routes/album';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();