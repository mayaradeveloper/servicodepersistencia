const express = require("express")
const server = express()
const router = express.Router()
const fs = require('fs')

server.use(express.json({extended: true}))

const lerArquivo = () => {
    const content = fs.readFileSync('./data/items.json', 'utf-8')
    return JSON.parse(content)
}

const gravarArquivoJSON = (body) => {
    
    const { nome, email, filtros } = body
    
    const listaPessoas = lerArquivo()
    listaPessoas.push({ nome, email, filtros })
    
    const arquivoAtualizado = JSON.stringify(listaPessoas)
    fs.writeFileSync('./data/items.json', arquivoAtualizado, 'utf-8')
}



/*
    O metodo de pesquisa recebe um parâmetro e busca na lista de objetos se há algum objeto com uma propriedade 
    na chave filtros que contenha alguma parte da string recebida por parâmetro. Sendo assim não é necessário digitar a 
    palavra inteira para realizar uma pesquisa. Por exemplo: ao digitar "Jun" a pesquisa retornará todos emails dos objetos
    que contenham a string "Junior" na propriedade,  
*/
const pesquisa = (param) => {
    const listaPessoas = lerArquivo();
    const listaEmails = [];

    const listaResultados = listaPessoas.filter(p => {
            
            let filtros = p.filtros
        
            if (
                filtros.nivel.indexOf(param) !== -1     ||
                filtros.contrato.indexOf(param) !== -1  ||
                filtros.localidade.indexOf(param) !== -1
                ) {
                return true;   
            }
        }
    )

    for (resultado in listaResultados) {
        listaEmails.push({email: listaResultados[resultado].email})
    }

    return listaEmails;
}


router.get('/', (req, res) => {
    const content = lerArquivo()
    res.send(content)
})

router.post('/', (req, res) => {
    gravarArquivoJSON(req.body)

    res.send({ sucess: "true" })
})

server.use(router)

server.listen(3000, () => {
    console.log('Rodando servidor para testar funções')
})