const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once('open', (_) => {
  console.log('Mongoose connected:');
});

db.on('error', (err) => {
  console.error('Mongoose connection error:');
});
