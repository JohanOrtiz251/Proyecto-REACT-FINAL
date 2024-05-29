const express = require('express');
const cors = require('cors');
const { registrarUsuario, iniciarSesion } = require('./controllers/userController');
const bodyParser = require('body-parser');
const axios = require('axios'); // Importar axios

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/registro', registrarUsuario);
app.post('/login', iniciarSesion);

app.get("/", (req, res) => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: 'https://api.jsonbin.io/v3/b/664e4495e41b4d34e4f7d7f2',
    headers: {
      'Content-Type': 'application/json',
      "X-Master-Key": "$2a$10$/mcvIEltjOIKAA3.1TkrE.D1nJgzbo5AigxCM0BKZOSh5HXm2.9o2"
    }
  };

  axios(config)
    .then(result => {
      res.send(result.data.record);
    })
    .catch(error => {
      console.error('Error fetching data from JSONBin:', error);
      res.status(500).send('Error fetching data');
    });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
