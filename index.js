const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12724567',
  password: 'cVkPr99UM4',
  database: 'sql12724567'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});
app.get('/trucks', (req, res) => {
      const query = 'SELECT * FROM `TABLE 2`';  
      db.query(query, (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json(results);
       results.forEach(result=>{
            console.log(result) ;
       })
      });
    });
app.get('/orders', (req, res) => {
  const query = `
  SELECT * 
  FROM \`TABLE 3\` 
  ORDER BY 
      CAST(SUBSTRING(\`COL 7\`, 7, 4) AS UNSIGNED) * 10000 + 
      CAST(SUBSTRING(\`COL 7\`, 4, 2) AS UNSIGNED) * 100 + 
      CAST(SUBSTRING(\`COL 7\`, 1, 2) AS UNSIGNED) DESC
`; 
      db.query(query, (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json(results);
       results.forEach(result=>{
            console.log(result) ;
       })
      });
    });    
    app.get('/orderaddress', (req, res) => {
      const { address } = req.query;
  
      if (!address) {
          return res.status(400).send('Address is required');
      }
  
      const query = 'SELECT * FROM `TABLE 3` WHERE `COL 2` = ?';
      db.query(query, [address], (err, results) => {
          if (err) {
              res.status(500).send(err);
              return;
          }
          res.json(results);
          results.forEach(result => {
              console.log(result);
          });
      });
  });
  app.get('/orderdaterange', (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).send('Start date and end date are required');
    }

    // Convert dates from dd/mm/yyyy to yyyy-mm-dd for SQL
    // const [startDay, startMonth, startYear] = startDate.split('/');
    // const [endDay, endMonth, endYear] = endDate.split('/');

    // const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
    // const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;

    const query = 'SELECT * FROM `TABLE 3` WHERE `COL 7` BETWEEN ? AND ?';
    db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
        results.forEach(result => {
            console.log(result);
        });
    });
});   
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


