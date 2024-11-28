const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Importando o pacote CORS

const app = express();
const port = 3000;

// Habilitando o CORS para todas as origens
app.use(cors());

// Configuração do body-parser
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para obter todos os avisos
app.get('/api/notices', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'notices.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler o arquivo de avisos.');
    }
    res.json(JSON.parse(data));
  });
});

// Rota para adicionar um novo aviso
app.post('/api/notices', (req, res) => {
  const newNotice = req.body;

  fs.readFile(path.join(__dirname, 'data', 'notices.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler o arquivo de avisos.');
    }

    const notices = JSON.parse(data);
    notices.push(newNotice);

    fs.writeFile(path.join(__dirname, 'data', 'notices.json'), JSON.stringify(notices, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Erro ao salvar o novo aviso.');
      }
      res.status(201).send('Aviso adicionado com sucesso.');
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
