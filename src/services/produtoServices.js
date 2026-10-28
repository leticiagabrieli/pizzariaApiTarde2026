// src/services/clienteServices.js
import db from '../db/db.js';

export const findAll = async (minValor, maxValor, tipo, nomeProduto, idProduto) => {
  // 1. Define a consulta SQL base
  let sql = 'SELECT * FROM produto';
  // 2. Cria um array para as condições WHERE
  const conditions = [];
  // 3. Cria um array para os valores (para prevenir SQL Injection)
  const values = [];
  // 4. Adiciona as condições dinamicamente
  // Adicionamos o filtro de CPF
  if (minValor){
    conditions.push('valor >=?');
    values.push(minValor);
  }
  if (maxValor){
    conditions.push('valor <=?');
    values.push(maxValor);
  }
 
  if (idProduto) {
    conditions.push('idproduto = ?');
    values.push(idProduto);
  }
  // Adicionamos o filtro de nome
  if (nomeProduto) {
    conditions.push('LOWER(nomeProduto) LIKE ?');
    values.push(`%${nomeProduto.toLowerCase()}%`);
  }

  // Adicionamos o filtro de email
  if (tipo) {
    conditions.push('tipo = ?');
    values.push(tipo);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  // 6. Executa a consulta final
  const [rows] = await db.query(sql, values);
  return rows;

};


export const create = async (produtoData) => {
  await db.query('INSERT INTO produto SET ?', produtoData);
return produtoData;
};


export const update = async (idProduto, produtoData) => {
 
  const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [produtoData, idProduto
  ]);
  return result.affectedRows > 0;
};

export const remove = async (idProduto) => {
  const [result] = await db.query('DELETE FROM produto WHERE idproduto = ?', [idProduto]);
  return result.affectedRows > 0;
};