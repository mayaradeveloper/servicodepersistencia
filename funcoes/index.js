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
    
    const { email } = body
    
    const listaPessoas = lerArquivo()
    listaPessoas.push({ email })
    
    const arquivoAtualizado = JSON.stringify(listaPessoas)
    fs.writeFileSync('./data/items.json', arquivoAtualizado, 'utf-8')
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
