/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');
const database = require('./database');

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

database.inktFormSql.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});
