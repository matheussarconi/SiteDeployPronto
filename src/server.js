const express = require('express');
const cors = require('cors');
//definir a porta 
const porta = 3002;
const app = express();
//habilitar o cors e utilizar json
app.use(cors());
app.use(express.json());


//testar
const connection = require('./dp_config');
const upload = require('./multer')

app.post('/usuario/cadastrar', (request, response) => {
    let params = Array(
        request.body.nomeUsuario,
        request.body.email,
        request.body.senha
    );

    let query = "INSERT INTO usuario(nomeUsuario, email, senha) values(?,?,?);";
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                sucess: true,
                message: "suceesso",
                data: results
            })

        } else { 
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem suceesso",
                data: err
            })
        }
    })
});

//LOGIN
app.post('/logar/usuario', (req, res) => {
    console.log('Dados recebidos:', req.body);

    let params = [req.body.email];
    let query = "SELECT id_usuario, nomeUsuario, senha FROM usuario WHERE email = ?";
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados:', err);
            return res.status(500).json({
                success: false,
                message: "Erro no servidor"
            });
        }

        if (results.length > 0) {
            let senhaDigitada = req.body.senha;
            let senhaBanco = results[0].senha;

            if (senhaBanco === senhaDigitada) {
                res.status(200).json({
                    success: true,
                    message: "Sucesso",
                    data: results[0]
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Senha não cadastrada"
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Email não cadastrado"
            });
        }
    });
});



// Rota para adicionar um novo produto
app.post('/cadastrar/produto', upload.single('imagemProduto'), (request, response) => {
    let params = [
        request.body.nomeProduto,
        request.body.precoProduto,
        request.body.descricao,
        request.body.qtdDisponivel,
        request.file ? request.file.filename : null // Acessa corretamente o nome do arquivo
    ];

    let query = "INSERT INTO produtos(nomeProduto, precoProdutos, descricao, qtdDisponivel, imagemProduto) VALUES(?, ?, ?, ?, ?)";
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            return response.status(400).json({
                success: false,
                message: "Sem sucesso!",
                data: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: results
        });
    });
});




app.use('/uploads', express.static(__dirname +  '\\public'))

//ROTA PARA LISTAR OS PRODUTOS
app.get('/produtos/listar', (request, response) => {
    let query = "SELECT * FROM produtos";

    connection.query(query, (err, results) => {
        if(results){
            response
            .status(200)
            .json({
                success: true,
                message: "Sucesso!",
                data: results
            })
        } else{
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso!",
                data: results
            })
        }
    })
})

app.listen(porta, () => console.log(`rodando na porta ` + porta));


