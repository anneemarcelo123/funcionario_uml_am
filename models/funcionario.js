const {sequelizeDb, sequelizeConfig} = require('./database') //estamos usando o recurso de desestruturação de objetos para importar apenas os módulos necessários.
const departamento = require('./departamento')//importando a tabela departamento

//Criando a tabela 
const funcionario = sequelizeConfig.define(
    'funcionario', //nome da tabela
    {
        nome:{type:sequelizeDb.STRING},
        salario:{type:sequelizeDb.FLOAT},
        cargo:{type:sequelizeDb.STRING}
    }
)

/*
Não iremos criar os campos 'id_funcionario' e a chave estrangeira, pois o sequelize irá criar esses campos automaticamente, ou seja, tanto a chave primaria quanto a chave estrangeira são criados pelo sequelize
 */

//Configurar a chave estrangeira
//Estou dizendo que departamento possui funcionários
departamento.hasMany(funcionario,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
funcionario.belongsTo(departamento)//Estou dizendo que funcionário pertence a apenas 1 departamento

funcionario.sync()
module.exports = funcionario