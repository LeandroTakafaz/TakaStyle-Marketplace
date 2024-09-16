const express = require('express');
const app = express();
const port = 4200;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

const bdTaka = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '777',
    database: 'cadastrodb',
    port: 4200
});

bdTaka.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Conexão com o banco de dados estabelecida');
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/cadastro', (req,res) => {
    const {nome, email, senha} = req.body;

    if (!nome || !email || !senha) {
        res.status(400).send({ error: 'Preencha todos os campos'});
    }

    bdTaka.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Erro ao inserir os dados no banco de dados!' });
        } else {
            res.status(200).send({ success: 'Usuário cadastrado com sucesso!', id: results.insertId });
        }
    });

})