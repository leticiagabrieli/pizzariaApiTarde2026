// src/clienteController.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as produtoService from '../services/produtoServices.js';
import Joi from 'joi';

//Usando 'export const' para criar e exportar a função
//Criação dos Schemas que o validate irá usar para validar dados do usuário
export const produtoCreateSchema = Joi.object({
  nomeProduto: Joi.string().required().max(100),
  descrição: Joi.string().required().max(100),
  tipo: Joi.string().max(15).allow(''),
  valor: Joi.string().max(30).allow(''),
  imagem  : Joi.string().required(100),
});

export const produtoUpdateSchema = Joi.object({
  nomeProduto: Joi.string().max(100),
  descrição: Joi.string().max(30).allow(''),
  tipo: Joi.string().max(30).allow(''),
  valor: Joi.string(),
  imagem : Joi.string().email().max(50),
}).min(1);

export const listarproduto = async (req, res) => {
    try {
     
      const {minValor,maxValor, tipo, nomeProduto,idProduto} = req.query;
   
      const produto = await produtoService.findAll(minValor,maxValor, tipo, nomeProduto,idProduto);
  
      res.json(produto);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


export const adicionarproduto= async (req, res) => {
  try {
    const novoProduto = await produtoService.create(req.body);
    res.status(201).json({ message: 'Produto adicionado com sucesso', data: novoProduto });
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'idProduto já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
};

export const atualizarproduto = async (req, res) => {
  try {
    const { idProduto } = req.params;
    const updated = await produtoService.update(idProduto, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar Produto:', err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deletarproduto = async (req, res) => {
  try {
    const { idProduto } = req.params;
    const deleted = await produtoService.remove(idProduto);
    if (!deleted) {
      return res.status(404).json({ error: 'produto não encontrado' });
    }
    res.status(200).json({ message: 'produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};