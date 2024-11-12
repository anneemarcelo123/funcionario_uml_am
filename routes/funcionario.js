const express = require('express')
const router = express.Router()

//Importando as tabelas 
const funcionario = require('../models/funcionario')
const departamento = require('../models/departamento')

//Criando as rotas
//1ª rota - Inserir dados na tabela
router.post('/store', async(req, res)=>{
    const resultado = await funcionario.create({
        nome:req.body.nome,
        salario:req.body.salario,
        cargo:req.body.cargo,
        departamentoId:req.body.departamento //Esse campo é a chave estrangeira
    })

    if(resultado){
        res.redirect('/')
    }
    else{
        res.json({erro:"Os dados não foram cadastradados no banco"})
    }
})

//2ª rota - Exibir página inicial do funcionário
router.get('/show', (req, res)=>{
    res.send("<h1>Página inicial do funcionário</h1>")
})

//3ª rota - Consultar dados da tabela 
router.get('/', async(req, res)=>{
    const resultado = await funcionario.findAll({include: departamento}) //include: departamento é como o sequelize faz para poder realizar consultas com join

    if(resultado){
        console.log(resultado)
        res.render("funcionario/index",{dados:resultado})
    }
    else{
        console.log("Não foi possível exibir os dados")
    }
})

//4ª rota - deletar dados da tabela
//id: significa que iremos passar um valor na porta, ou seja, iremos informar um valor que deverá ser diferente e que será armazenado pela variavél :id
router.get('/destroy/:id', async(req, res)=>{
    const resultado = await funcionario.destroy({
        where:{
            id:req.params.id //Estamos recebendo o id via parâmetro que está sendo passado na rota, no caso, é o :id que estamos recebendo
        }
    })
    res.redirect("/")
})

//5ª rota - exibir formulário de cadastro
router.get('/create',async(req, res)=>{
    let resultado = await departamento.findAll()

    if(resultado){
        res.render('funcionario/addFuncionario', {dados:resultado})
    }
    else{
        console.log("Não foi póssivel carregar os dados")
        res.redirect("/") //redirecionando para a página inicial 
    }

})


module.exports = router