/****************************************************************************/
/*Objetivo: Model responsável pelo CRUD de dados de música no Banco de Dados*/
/*Data: 13/02/2024                                                          */
/*Autor: Cachorrada                                                         */
/*Versão: 1.0                                                               */
/****************************************************************************/

//Import da biblioteca do prisma/client
const {PrismaClient } = require('@prisma/client')

//Instânciando (criar novo objeto) para realizar a manipulação do Script SQL
const prisma = new PrismaClient()

//Função para inserir uma nova música no Banco de Dados
const insertMusica = async function(musica){

    

try {


    let sql = `insert into tb_musica (nome_musica,
                                      link,
                                      duracao,
                                      data_lancamento,
                                      foto_capa,
                                      letra  
                                    )  
                             values (
                                        "${musica.nome_musica}",
                                        "${musica.link}",
                                        "${musica.duracao}",
                                        "${musica.data_lancamento}",
                                        "${musica.foto_capa}",
                                        "${musica.letra}"
                                    )`
console.log(sql)
    
    //Executa o Script SQL no BD e aguarda o retorno do BD                                  
    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true
    else
        return false

} catch (error) {
    return false
}
}

//Função para atualizar uma música existente no Banco de Dados
const updateMusica = async function(){

}

//Função para excluir uma música existe no Banco de Dados
const deleteMusica = async function(){
    try {
        let sql = 'DELETE FROM tb_musica WHERE id_musica = 2'

        
        //Execta o Script SQL no BD e aguarda o retorno dos dados.
        let result = await prisma.$queryRawUnsafe(sql)
        
        

        if(result)
            return result
        else
            return false
    } catch (error) {
        
        return false
    }
}



//Função para retornar todas as músicas do Banco de Dados
const selectAllMusica = async function(){
    try {
        let sql = 'select * from tb_musica order by id_musica asc'
        
        //Execta o Script SQL no BD e aguarda o retorno dos dados.
        let result = await prisma.$queryRawUnsafe(sql)
        
        

        if(result)
            return result
        else
            return false
    } catch (error) {
        
        return false
    }

}

//Função para buscar uma música pelo ID no Banco de Dados
const selectByIdMusica = async function(){
    try {
        let sql = 'SELECT * FROM tb_musica WHERE id_musica = 2'
        
        let result = await prisma.$queryRawUnsafe(sql)

        if (result) 
            return result.map(row => row.id_musica) // Retorna apenas os IDs
        else 
            return false
    } catch (error) {
        return false
    }

}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}