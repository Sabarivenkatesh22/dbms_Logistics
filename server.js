const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!')).catch((err) => console.log(err));


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});