// src/services/clienteServices.js
import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (minValor,maxValor, tipo, nomeProduto,idProduto) => {
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
    conditions.push('LOWER(nome) LIKE ?');
    values.push(`%${nomeProduto.toLowerCase()}%`);
  }

  // Adicionamos o filtro de email
  if (tipo) {
    conditions.push('tipo = ?');
    values.push(tipo);
  }

  // 5. Se houver condições, anexa elas à consulta SQL
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  // 6. Executa a consulta final
  const [rows] = await db.query(sql, values);
  return rows;

};


export const create = async (produtoData) => {
 // const saltRounds = 10;
 //const hashedPassword = await bcrypt.hash(clienteData.senha, saltRounds);

  //const newCliente = {
   // ...clienteData,
   // senha: hashedPassword,
   // tipo: 'cliente',
  //};

  await db.query('INSERT INTO usuario SET ?', newproduto);

 //delete newCliente.senha;
return newproduto;
};


export const update = async (idProduto, produtoData) => {
  if (produtoData.senha) {
    const saltRounds = 10;
    produtoData.senha = await bcrypt.hash(produtoData.senha, saltRounds);
  }
  const [result] = await db.query('UPDATE usuario SET ? WHERE cpf = ?', [produtoData, idProduto
  ]);
  return result.affectedRows > 0;
};

export const remove = async (idProduto) => {
  const [result] = await db.query('DELETE FROM usuario WHERE cpf = ?', [idProduto]);
  return result.affectedRows > 0;
};