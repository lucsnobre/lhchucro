/*******************************************************************************/
/*Objetivo: Controller responsável pela manipulação do CRUD de dados de música */
/*Data: 13/02/2024                                                             */
/*Autor: Cachorrada                                                            */
/*Versão: 1.0                                                                  */
/*******************************************************************************/

const MESSAGE = require('../../../Módulo/config')



//Import do arquivo DAO de música para manipular o BD
const musicaDAO = require('../../Model/DAO/musica')

//Função para inserir uma música
const inserirMusica = async function(musica, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')

        {

        if(  musica.nome_musica             == undefined || musica.nome_musica                     == ''        || musica.nome_musica                     == null        || musica.nome_musica.lenght                 > 80     ||
            musica.link             == undefined || musica.link                     == ''        || musica.link                     == null        || musica.link.lenght                 > 200    ||
            musica.duracao          == undefined || musica.duracao                  == ''        || musica.duracao                  == null        || musica.duracao.lenght              > 5      ||
            musica.data_lancamento  == undefined || musica.data_lancamento          == ''        || musica.data_lancamento          == null        || musica.data_lancamento.lenght      > 10     ||
            musica.foto_capa        == undefined || musica.foto_capa.lenght         > 200        ||
            musica.letra            == undefined
       ){
           return MESSAGE.ERROR_REQUIRED_FIELDS
       }else{
           let resultMusica = musicaDAO.insertMusica(musica)
   
           if (resultMusica)
               return MESSAGE.SUCESS_CREATED_ITEM //201
           else
               return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
       }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para atualizar uma música
const atualizarMusica = async function(){
    
}

//Função para excluir uma música
const excluirMusica = async function(id_musica) {
    try {
        // Chamar a função que deleta a música pelo ID
        let dadosMusica = await musicaDAO.deleteMusica(id_musica)

        // Verificar se a música foi deletada com sucesso
        if (dadosMusica) {
            return {
                status: true,
                status_code: 200,
                message: "Música deletada com sucesso."
            }
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404 - Música não encontrada
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500 - Erro no servidor
    }
}


//Função para listar uma música
const listarMusica = async function(){
    try {
        let dadosMusica = {}
        //Chamar a função que retorna todas as músicas
        let resultMusica = await musicaDAO.selectAllMusica()

        if (resultMusica != false || typeof(resultMusica) == 'object')

        
    
    if (resultMusica != false){
        if(resultMusica.length > 0){
            //Criando um objeto JSON para retornar a lista de músicas
            dadosMusica.status = true
            dadosMusica.status_code = 200
            dadosMusica.itens = resultMusica.length
            dadosMusica.musica = resultMusica
            
            
            return dadosMusica //200
        }else{
            return MESSAGE.ERROR_NOT_FOUND //404
        }
    }else{
        
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }
    
    
    
    
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500 
    }
    
}

//Função para buscar uma música
const buscarMusica = async function(id_musica) {
    try {
        // Chamar a função que retorna a música pelo ID
        let resultMusica = await musicaDAO.selectByIdMusica(id_musica);
        if (resultMusica && typeof resultMusica === 'object') {
            // Criar um objeto JSON para retornar a música encontrada
            let dadosMusica = {
                status: true,
                status_code: 200,
                musica: resultMusica
            };
            return dadosMusica; // 200
        } else {
            // Mensagem de erro caso a música não seja encontrada
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }

};



module.exports = {
  inserirMusica,
  atualizarMusica,
  excluirMusica,
  listarMusica,
  buscarMusica
}