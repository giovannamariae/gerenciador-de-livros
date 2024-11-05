const express = require("express")
const router = express.Router()


const app = express()

const porta = 3333
const livro = [
    {   nome: 'A coragem de não agradar,',
        autor:' Ichiro Kishimi  &  Fumitake Koga',
        categoria:'Política, Filosofia e Ciências Sociais'
},
    {   nome: 'Pra vida toda vale a pena viver,',
        autor:' Ana Claudia Quintana Arantes',
        categoria:'Saúde e família'
},
    {   nome: '12 regras para a vida,',
        autor:'Jordan Peterson',
        categoria:'Autoajuda'
    }
]

function mostraLivro(request, response) {

 response.json(livro)
 
}
function mostraPorta() {

    console.log("Servidor criado e rodando na porta ", porta)

}

app.use(router.get('/livro', mostraLivro))
app.listen(porta, mostraPorta)
