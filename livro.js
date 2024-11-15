const express = require("express")// iniciando o express
const router = express.Router()// primeira parte da rota
const cors = require('cors') //trazendo o pacote cors que permite consumir front end
const conectaBancoDeDados = require('./bancoDeDados')// ligando ao arquivo banco de dados
conectaBancoDeDados()// chamando a função que conecta o banco de dados
const Livro = require('./livroModel')
const app = express()// iniciando o app
app.use(cors())//liberando cors para o uso
const porta = 3333// criando a porta

//GET
async function mostraLivro(request, response) {
    try{
        const livrosVindosDoBancoDeDados = await Livro.find()
        response.json(livrosVindosDoBancoDeDados)

    }catch(erro){

    console.log(erro)

    }
}

//POST
async function criaLivro(request, response){
    const novoLivro = new Livro({
        nome: request.body.nome,
        autor: request.body.autor,
        categoria: request.body.categoria
    })
    try{
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)

    }catch(erro) {
        console.log(erro)
    }
}
//PATCH
async function corrigeLivro(request, response) {
    try {
        const livroEncontrado = await Livro.findById(request.params.id)

        if (request.body.nome) {
            livroEncontrado.nome = request.body.nome
        }

        if (request.body.autor) {

           livroEncontrado.autor = request.body.autor
        }

        if (request.body.categoria) {
           livroEncontrado = request.body.categoria
        }

        const livroAtualizadoNoBancoDeDados = await livroEncontrado.save()

        response.json(livroAtualizadoNoBancoDeDados)

    } catch (erro) {
        console.log(erro)
    }
}
//DELETE
async function deletaLivro(request, response) {

    try {
        await Livro.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Livro deletado com sucesso!'})

    } catch(erro) {
        console.log(erro)

    }

}

//PORTA
function mostraPorta() {

    console.log("Servidor criado e rodando na porta ", porta)

}

app.use(router.get('/livro', mostraLivro))// configurei a rota GET/livro
app.use(router.post('/livro',criaLivro))//configurei rota POST /livro
app.use(router.patch('/livro',corrigeLivro))//configurei rota PATCH /livro
app.use(router.delete('/livro/id', deletaLivro))// configurei rota DELETE/livro
app.listen(porta, mostraPorta)// servidor ouvindo a porta

