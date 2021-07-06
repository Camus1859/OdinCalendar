const express = require('express');
require('./src/db/mongoose');
//const Event = require('./src/models/event');
const app = express();
const port = process.env.PORT || 3000;

// const PostToDb = async () => {
//   const task = new Event({
//     title: 'abc',
//     body: 'def',
//   });
//   console.log(task);

//   try {
//     await task.save();
//     console.log(task);
//   } catch (e) {
//     console.log(e);
//   }
// };

// PostToDb();

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
