//Carregar os módulos
const express = require("express")
const handlebars = require("express-handlebars")

const app = express()
const porta = 5500

//Configurar o express para receber dados do formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Configurando handlebars
app.engine('handlebars', handlebars.engine({extended:true}))
app.set('view engine', 'handlebars') //Definindo o handlebars como mecanismo de visualização padrão.

//Carregar as rotas
const funcionarioRouter = require('./routes/funcionario')

//Utilizando as rotas
app.use('/funcionario',funcionarioRouter)

//Exibindo informações na tela
app.get("/",(req,res)=>{
    //res.send("<h1>Tudo Funcionando</h1>")
    res.render('home')
})




//Executando o servidor 
app.listen(porta, ()=>{
    console.log("Servidor executando na porta ", porta)
})