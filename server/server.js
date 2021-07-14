const express = require('express');
const app = express();
const cors = require('cors');
require('./src/db/mongoose');
const eventRouter = require('./src/routers/event');

app.use(express.static('client/src'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(eventRouter);

const port = process.env.PORT || 3000;

// const postHolidays = async () => {
//   await fetch('/holidays', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json;charset=UTF-8',
//       Accept: 'application/json',
//     },
//   });
// };
// postHolidays();

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
