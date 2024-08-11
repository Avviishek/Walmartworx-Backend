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
      const query = 'SELECT * FROM `TABLE 6`';  
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

   

    const query = `SELECT * FROM \`TABLE 3\`   WHERE \`COL 7\` BETWEEN ? AND ? ORDER BY 
      CAST(SUBSTRING(\`COL 7\`, 7, 4) AS UNSIGNED) * 10000 + 
      CAST(SUBSTRING(\`COL 7\`, 4, 2) AS UNSIGNED) * 100 + 
      CAST(SUBSTRING(\`COL 7\`, 1, 2) AS UNSIGNED) ASC`;
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
app.get('/orderdateaddress', (req, res) => {
  const { startDate, endDate, address } = req.query;

  if (!startDate || !endDate) {
      return res.status(400).send('Start date and end date are required');
  }
  if (!address) {
    return res.status(400).send('Address is required');
}

 

  const query = `SELECT * FROM \`TABLE 3\`   WHERE \`COL 7\` BETWEEN ? AND ? 
    AND \`COL 2\` = ?
    ORDER BY 
    CAST(SUBSTRING(\`COL 7\`, 7, 4) AS UNSIGNED) * 10000 + 
    CAST(SUBSTRING(\`COL 7\`, 4, 2) AS UNSIGNED) * 100 + 
    CAST(SUBSTRING(\`COL 7\`, 1, 2) AS UNSIGNED) ASC`;
  db.query(query, [startDate, endDate , address], (err, results) => {
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
app.get('/address', (req, res) => {
  const query = 'SELECT DISTINCT `COL 2` FROM `TABLE 3`'; 

  db.query(query, (err, results) => {
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
app.get('/assigned', (req, res) => {
  const query = 'SELECT DISTINCT `COL 2` FROM `TABLE 3`'; 

  db.query(query, (err, results) => {
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
app.get('/assignedorder', (req, res) => {
  const { address } = req.query;

  if (!address) {
      return res.status(400).send('Address is required');
  }

  // Determine the table to query based on the address
  let tableName;
  if (address.toLowerCase() === 'delhi') {
      tableName = 'TABLE 4';
  } else if (address.toLowerCase() === 'hyderabad') {
      tableName = 'TABLE 5';
  } else {
      return res.status(400).send('Invalid address provided');
  }

  const query = `SELECT * FROM \`${tableName}\``;
  db.query(query, (err, results) => {
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
app.get('/assigned', (req, res) => {
  const query = 'SELECT DISTINCT `COL 2` FROM `TABLE 3`'; 

  db.query(query, (err, results) => {
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
app.get('/assigntruck', (req, res) => {
  const { address } = req.query;

  if (!address) {
      return res.status(400).send('Address is required');
  }

  
  let responseData;

  const currentDate = new Date().toISOString().split('T')[0]; // Get the present date in yyyy-mm-dd format

  if (address.toLowerCase() === 'delhi') {
      responseData = {
          "vehicle reg no": "DL93TO7899", 
          "driver name": "Nishant",
          "mobile no": "6720674334",
          "date assigned": currentDate,
          "volume": 26.08
      };
  } else if (address.toLowerCase() === 'hyderabad') {
      responseData = {
          "vehicle reg no": "TS36VH9939", 
          "driver name": "Vikas",
          "mobile no": "7240121780",
          "date assigned": currentDate,
          "volume": 27.65
      };
  } else {
      return res.status(400).send('Invalid address provided');
  }
  res.json(responseData);
});
app.post('/addorder', (req, res) => {
  const order = req.body;

  if (!order || Object.keys(order).length === 0) {
      return res.status(400).send('Order data is required');
  }

  // Assuming the order object has the following structure:
  // {
  //     "vehicle_reg_no": "XYZ123",
  //     "driver_name": "Rajan Kumar",
  //     "mobile_no": "8453345678",
  //     "date_assigned": "08/08/2024",
  //     "volume": 26.08,
  //     "address": "Delhi"
  // }

  const query = `
      INSERT INTO \`TABLE 3\` (\`COL 1\`, \`COL 2\`, \`COL 3\`, \`COL 4\`, \`COL 5\`, \`COL 6\`,\`COL 7\`)
      VALUES (?, ?, ?, ?, ?, ?,?)
  `;

  // Extract the values from the order object
  const values = [
    order["COL 1"],
    order["COL 2"],
    order["COL 3"],
    order["COL 4"],
    order["COL 5"],
    order["COL 6"],
    order["COL 7"]  
  ];

  db.query(query, values, (err, result) => {
      if (err) {
          res.status(500).send(err);
          return;
      }
      res.status(201).send('Order added successfully');
  });
});
app.get('/recentorders', (req, res) => {
  const query = `
  SELECT * 
  FROM \`TABLE 3\` 
  ORDER BY 
      CAST(SUBSTRING(\`COL 7\`, 7, 4) AS UNSIGNED) * 10000 + 
      CAST(SUBSTRING(\`COL 7\`, 4, 2) AS UNSIGNED) * 100 + 
      CAST(SUBSTRING(\`COL 7\`, 1, 2) AS UNSIGNED) DESC
      LIMIT 8
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


