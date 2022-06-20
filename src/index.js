const express = require("express");
const { v4 } = require("uuid")

const app = express();

app.use(express.json())

const catalogo = [];

app.get("/catalogo", (request, response) => {
    return response.json(catalogo)
})

app.post("/catalogo", (request, response) => {
    const { titulo, duracao, atores, anoLancamento, emCartaz } = request.body

    const filme = { id: v4(), titulo, duracao, atores, anoLancamento, emCartaz }

    catalogo.push(filme)

    return response.json(filme) // através dessa linha é que o usuário obterá o retorno do que ele informou
})

app.put("/catalogo/:id", (request, response) => {
    const { id } = request.params;
    // aqui primeiro ele irá identificar o ID solicitado

    const { titulo, duracao, atores, anoLancamento, emCartaz } = request.body
    // aqui então ele recolherá todas as demais informações a serem alteradas

    const filmeIndex = catalogo.findIndex(filme => filme.id === id)
    // aqui então ele comparará o id que vc indicou no INSOMNIA com o que ele encontrou 

    if (filmeIndex < 0) {
        return response.status(400).json({ error: 'Filme não encontrado no catálogo.' })
    }

    const filme = {
        id,
        titulo,
        duracao,
        atores,
        anoLancamento,
        emCartaz
    }

    catalogo[filmeIndex] = filme

    return response.json(filme);
})

app.delete("/catalogo/:id", (request, response) => {
    const { id } = request.params;

    const { titulo, duracao, atores, anoLancamento, emCartaz } = request.body

    const filmeIndex = catalogo.findIndex(filme => filme.id === id)

    if (filmeIndex < 0) {
        return response.status(400).json({ error: 'Filme não encontrado no catálogo.' })
    }

    catalogo.splice(filmeIndex, 1)

    return response.status(204).send()
})

app.listen(8080);
