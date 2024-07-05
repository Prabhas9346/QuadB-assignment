const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const { open } = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const path = require('path');

const dbPath = path.join(__dirname, 'wazirx.db');
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Serve static files from the "public" directory
    app.use(express.static(path.join(__dirname, 'public')));

    await createTable();
    await fetchDataAndInsert(); // Initial data fetch
    setInterval(fetchDataAndInsert, 60000); // Fetch data every 60 seconds

    app.listen(8000, () => {
      console.log('Server is running at http://localhost:8000/');
    });
  } catch (e) {
    console.log(e.message);
  }
};

const createTable = async () => {
  await db.run('DROP TABLE IF EXISTS crypto_data;');
  await db.run(`
    CREATE TABLE IF NOT EXISTS crypto_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      last REAL,
      buy REAL,
      low REAL,
      high REAL,
      sell REAL,
      volume REAL,
      base_unit TEXT
    );
  `);
};

const fetchDataAndInsert = async () => {
  const apiUrl = 'https://api.wazirx.com/api/v2/tickers';

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    const valuesTable = Object.values(data).slice(0, 10);

    await db.run('DELETE FROM crypto_data;'); // Clear the table before inserting new data

    for (let i of valuesTable) {
      const { name, last, buy, low, high, sell, volume, base_unit } = i;

      const addTodoQuery = `
        INSERT INTO 
          crypto_data (name, last, buy, low, high, sell, volume, base_unit)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `;

      await db.run(addTodoQuery, [
        name,
        last,
        buy,
        low,
        high,
        sell,
        volume,
        base_unit,
      ]);
    }

    console.log('Database updated with new data.');
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

app.get('/', async (request, response) => {
  const cryptoQuery = `SELECT * FROM crypto_data`;
  try {
    const cryptoData = await db.all(cryptoQuery);
    response.send(cryptoData);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    response.status(500).send('Error fetching data');
  }
});

initializeDBAndServer();
