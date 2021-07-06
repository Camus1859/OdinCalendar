const express = require('express');
const app = express();
app.use(express.static('client/src'));
const cors = require('cors');
require('./src/db/mongoose');
const eventRouter = require('./src/routers/event');

app.use(express.json());
app.use(cors());
app.use(eventRouter);


const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
